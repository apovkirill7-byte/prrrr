import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TAVUS_BASE_URL = "https://tavusapi.com/v2";
const REPLICA_ID = "r62baeccd777";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TAVUS_API_KEY = Deno.env.get('TAVUS_API_KEY');
    
    if (!TAVUS_API_KEY) {
      console.error("TAVUS_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "TAVUS_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { tutorName } = await req.json();
    
    console.log("Creating Tavus conversation for tutor:", tutorName);

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': TAVUS_API_KEY
    };

    // Step 1: Create a persona for this tutor
    console.log("Creating persona...");
    const personaBody = {
      persona_name: `Tutor ${tutorName}`,
      pipeline_mode: "full",
      system_prompt: `Ты ${tutorName}, опытный преподаватель. Веди занятие на русском языке. Будь дружелюбным, терпеливым и профессиональным. Помогай ученику освоить материал, задавай вопросы для проверки понимания.`
    };

    const personaResponse = await fetch(`${TAVUS_BASE_URL}/personas`, {
      method: 'POST',
      headers,
      body: JSON.stringify(personaBody)
    });

    const personaData = await personaResponse.json();
    console.log("Persona response:", JSON.stringify(personaData));

    if (!personaResponse.ok) {
      console.error("Failed to create persona:", personaData);
      return new Response(
        JSON.stringify({ error: personaData.message || "Failed to create persona" }),
        { status: personaResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const personaId = personaData.persona_id;
    console.log("Created persona with ID:", personaId);

    // Step 2: Create conversation with the new persona
    const conversationBody = {
      persona_id: personaId,
      replica_id: REPLICA_ID,
      test_mode: false,
      conversation_name: `Занятие с ${tutorName || 'репетитором'}`,
      properties: {
        language: "russian"
      }
    };

    console.log("Creating conversation:", JSON.stringify(conversationBody));

    const response = await fetch(`${TAVUS_BASE_URL}/conversations`, {
      method: 'POST',
      headers,
      body: JSON.stringify(conversationBody)
    });

    const data = await response.json();
    console.log("Tavus conversation response:", JSON.stringify(data));

    if (!response.ok) {
      console.error("Tavus API error:", data);
      return new Response(
        JSON.stringify({ error: data.message || "Failed to create conversation" }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        conversation_url: data.conversation_url,
        conversation_id: data.conversation_id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in tavus-conversation function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
