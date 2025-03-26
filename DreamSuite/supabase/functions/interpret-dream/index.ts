import { createClient } from 'npm:@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DreamInterpretationRequest {
  description: string;
  emotions: string[];
  tags: string[];
  premium: boolean;
}

// Initialize Supabase AI
const model = new Supabase.ai.Session('gte-small');

// Basic dream symbols for free interpretation
const basicDreamSymbols = {
  water: "emotions and the unconscious mind",
  fire: "transformation or passion",
  flying: "freedom or escape",
  falling: "loss of control or anxiety",
  house: "self or personal life",
  school: "learning or personal growth",
  running: "avoiding something or pursuing goals",
  door: "new opportunities or transitions",
  mountain: "challenges or ambitions",
  car: "life's journey or direction"
};

// Basic emotions for free interpretation
const basicEmotions = {
  joy: "positive experiences or achievements",
  fear: "concerns or challenges",
  anger: "frustration or need for change",
  peace: "harmony or resolution",
  confusion: "uncertainty or decision-making",
  excitement: "anticipation or new opportunities"
};

function generateBasicInterpretation(description: string, emotions: string[], tags: string[]): string {
  let interpretation = "Basic Dream Analysis:\n\n";

  // Analyze basic symbols
  const foundSymbols = Object.entries(basicDreamSymbols)
    .filter(([symbol]) => 
      description.toLowerCase().includes(symbol) || 
      tags.some(tag => tag.toLowerCase().includes(symbol))
    );

  if (foundSymbols.length > 0) {
    interpretation += "Dream Symbols:\n";
    foundSymbols.forEach(([symbol, meaning]) => {
      interpretation += `• The presence of '${symbol}' often represents ${meaning}.\n`;
    });
    interpretation += "\n";
  }

  // Analyze basic emotions
  const foundEmotions = emotions
    .map(emotion => {
      const matchedEmotion = Object.entries(basicEmotions)
        .find(([key]) => emotion.toLowerCase().includes(key.toLowerCase()));
      return matchedEmotion ? { emotion, meaning: matchedEmotion[1] } : null;
    })
    .filter(Boolean);

  if (foundEmotions.length > 0) {
    interpretation += "Emotional Analysis:\n";
    foundEmotions.forEach(({ emotion, meaning }) => {
      interpretation += `• The emotion '${emotion}' may indicate ${meaning}.\n`;
    });
    interpretation += "\n";
  }

  // Add general guidance
  interpretation += "General Guidance:\n";
  interpretation += "Consider how these elements relate to your current life situation. ";
  interpretation += "Dreams often reflect our daily experiences and emotions. ";
  interpretation += "For more detailed analysis, consider upgrading to our premium interpretation service.";

  return interpretation;
}

function generatePremiumInterpretation(description: string, emotions: string[], tags: string[], dreamEmbedding: number[]): string {
  let interpretation = "Premium Dream Analysis:\n\n";
  
  // Add various premium analysis components
  interpretation += analyzeArchetypes(description, tags);
  interpretation += analyzeSymbols(description, tags);
  interpretation += analyzeEmotions(emotions);
  interpretation += analyzeThematicPatterns(description, tags);
  interpretation += generatePersonalInsights(dreamEmbedding);
  interpretation += generateRecommendations(description, emotions, tags);

  // Add integration summary
  interpretation += "\n\nIntegration and Synthesis:\n";
  interpretation += "Your dream reveals complex psychological patterns and personal symbolism. ";
  interpretation += "The multiple layers of meaning suggest important unconscious processing. ";
  interpretation += "Consider journaling about these insights and how they relate to your current life journey. ";
  interpretation += "This deeper understanding can guide personal growth and decision-making.";

  return interpretation;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { description, emotions, tags, premium }: DreamInterpretationRequest = await req.json();

    // Generate embeddings for semantic analysis (used in premium interpretation)
    const dreamEmbedding = await model.run(description, { 
      mean_pool: true,
      normalize: true 
    });

    // Generate interpretation based on subscription status
    const interpretation = premium ? 
      generatePremiumInterpretation(description, emotions, tags, dreamEmbedding) :
      generateBasicInterpretation(description, emotions, tags);

    return new Response(
      JSON.stringify({ interpretation }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Edge function error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to interpret dream',
        details: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});