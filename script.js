document.querySelector('.busca').addEventListener('submit', async (evento) => {
    evento.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== " "){
        aviso('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=04a7d91331c90679cee07df52e661a95&units=metric&lang=pt_br`;
        
        let results = await fetch(url);
        let json = await results.json();


        console.log(json)
    } 
});

function aviso(msg){
    document.querySelector('.aviso').innerHTML = msg;
}