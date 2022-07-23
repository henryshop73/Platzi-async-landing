const API ='https://youtube-v31.p.rapidapi.com/search?channelId=UCIBObdyoPGID5tLdZ6VqVWg&part=snippet%2Cid&order=date&maxResults=5'

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ee2662a126msh8d1f99bd97cd4fcp1397bcjsnc8cb97c7f05a',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

//Lógica de async: ir por los datos, luego esperar por ellos y finalmente retornarlos hacia el usuario
async function fetchData(urlApi) { //Siempre async antes de function
    const response = await fetch(urlApi, options); //Hacemos uso del fetch() y solo por esta vez le pasamos las opciones
    const data = await response.json(); //Estructura de los datos transformándolos a json
    return data; //Retorna la información de la API que estamos solicitando
}

(async () => { //Dentro implementamos la lógica necesaria para hacerel llamado a la API, obtener los elementos y mostrarlos en html
    //Se implementa try y catch
    try {
        const videos = await fetchData(API);
        let view = `
        ${videos.items.map(video => `
        <div class="group relative">
            <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                </h3>
            </div>
        </div>
        `).slice(0,5).join('')}      
        `;
        content.innerHTML = view; //innerHTML es igual a la vista que se ha creado e itera con el método map y devuelve un nuevo arreglo con los elementos que queremos obtener como el título, la descripción, la imagen miniatura de la API
    }catch (error) {
        console.log(error);
    }
})();