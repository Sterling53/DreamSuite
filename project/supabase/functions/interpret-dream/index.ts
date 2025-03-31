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

async function generateBasicInterpretation(description: string, emotions: string[], tags: string[]): Promise<string> {
  const prompt = `Analyze this dream and provide a brief interpretation:

Dream Description: ${description}
Emotions: ${emotions.join(', ')}
Tags: ${tags.join(', ')}

Provide a concise interpretation that includes:
1. Key symbols and their meanings
2. Emotional significance
3. Brief guidance

Format the response in clear sections with emojis.`;

  try {
    const completion = await model.chat([
      { role: 'system', content: 'You are a dream interpreter providing insights about dreams.' },
      { role: 'user', content: prompt }
    ]);

    return completion.content;
  } catch (error) {
    console.error('AI interpretation failed:', error);
    return generateTemplateBasedInterpretation(description, emotions, tags);
  }
}

async function generatePremiumInterpretation(description: string, emotions: string[], tags: string[]): Promise<string> {
  const prompt = `Provide a detailed psychological analysis of this dream:

Dream Description: ${description}
Emotions: ${emotions.join(', ')}
Tags: ${tags.join(', ')}

Provide a comprehensive interpretation that includes:
1. Detailed symbol analysis
2. Psychological patterns and archetypes
3. Emotional dynamics and their significance
4. Personal growth insights
5. Actionable recommendations

Format the response in clear sections with emojis and detailed explanations.`;

  try {
    const completion = await model.chat([
      { 
        role: 'system', 
        content: 'You are an expert dream analyst providing detailed psychological interpretations of dreams.' 
      },
      { role: 'user', content: prompt }
    ]);

    return completion.content;
  } catch (error) {
    console.error('AI interpretation failed:', error);
    return generateTemplateBasedInterpretation(description, emotions, tags);
  }
}

function generateTemplateBasedInterpretation(description: string, emotions: string[], tags: string[]): string {
  let interpretation = "🌙 Dream Analysis\n\n";

  // Analyze emotions
  if (emotions.length > 0) {
    interpretation += "💭 Emotional Landscape:\n";
    emotions.forEach(emotion => {
      interpretation += `• ${emotion}: This emotion suggests ${getEmotionMeaning(emotion)}\n`;
    });
    interpretation += "\n";
  }

  // Analyze tags
  if (tags.length > 0) {
    interpretation += "🔍 Key Elements:\n";
    tags.forEach(tag => {
      interpretation += `• ${tag}: ${getSymbolMeaning(tag)}\n`;
    });
    interpretation += "\n";
  }

  // Add general guidance
  interpretation += "🌟 Guidance:\n";
  interpretation += "Consider how these dream elements relate to your current life situation. ";
  interpretation += "Dreams often reflect our inner thoughts and emotions, providing valuable insights for personal growth.";

  return interpretation;
}

function getEmotionMeaning(emotion: string): string {
  const meanings: Record<string, string> = {
    joy: "a period of fulfillment or achievement in your life",
    fear: "underlying concerns or challenges that need attention",
    anger: "unresolved conflicts or suppressed feelings",
    peace: "inner harmony and resolution of conflicts",
    anxiety: "uncertainty about upcoming changes or decisions",
    excitement: "anticipation of new opportunities or experiences",
    sadness: "processing of loss or need for emotional release",
    confusion: "complex situations requiring clarity or guidance"
  };

  return meanings[emotion.toLowerCase()] || "reflects aspects of your emotional state requiring attention";
}

function getSymbolMeaning(symbol: string): string {
  const meanings: Record<string, string> = {
    water: "represents emotions and the unconscious mind",
    fire: "symbolizes transformation or passion",
    flying: "suggests freedom or transcendence",
    falling: "indicates loss of control or anxiety",
    house: "represents the self or personal life",
    door: "symbolizes new opportunities or transitions",
    mountain: "represents challenges or aspirations",
    light: "suggests insight or spiritual awareness",
    darkness: "represents the unknown or hidden aspects",
    tree: "symbolizes growth and personal development"
  };

  return meanings[symbol.toLowerCase()] || "carries personal significance in your dream landscape";
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { description, emotions, tags, premium }: DreamInterpretationRequest = await req.json();

    // Generate interpretation based on subscription status
    const interpretation = premium ? 
      await generatePremiumInterpretation(description, emotions, tags) :
      await generateBasicInterpretation(description, emotions, tags);

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
      },
    );
  }
});