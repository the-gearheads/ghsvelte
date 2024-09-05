
// post in your unsubmitted match datas, get all match data back.
export async function POST(event) {
    if(event.request.method == "POST") {
      const body = await event.request.json();
      if (Object.keys(body).length !== 0) {
        // do something with the data
        return new Response(JSON.stringify(body));
      }
      return new Response(JSON.stringify(body));
    }
}