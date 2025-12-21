import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TAVUS_BASE_URL = "https://tavusapi.com/v2";
const PERSONA_ID = "pcf2b035d832";
const REPLICA_ID = "r62baeccd777";

serve(async (req) => {
  // Handle CORS preflight requests
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

    const body = {
      persona_id: PERSONA_ID,
      replica_id: REPLICA_ID,
      test_mode: false,
      conversation_name: `Занятие с ${tutorName || 'репетитором'}`,
      properties: {
        language: "russian"
      }
    };

    console.log("Request body:", JSON.stringify(body));

    const response = await fetch(`${TAVUS_BASE_URL}/conversations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': TAVUS_API_KEY
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    
    console.log("Tavus API response:", JSON.stringify(data));

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
