export async function POST(event) {
    if(event.request.method == "POST") {
      return new Response(event.request.url);
    }
}