document.querySelector('.busca').addEventListener('submit', async (evento) => {
    evento.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== " "){
        clearInfo();
        aviso('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=
        ${encodeURI(input)}&appid=04a7d91331c90679cee07df52e661a95&units=metric&lang=pt_br`;
        let results = await fetch(url);
        let json = await results.json();


        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                desc: json.weather[0].description,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }else{
            clearInfo();
            aviso('Localização não encontrada.');
        }
    } else {
        clearInfo();
    }
});

function showInfo(json){
    aviso('');
    
    document.querySelector('.titulo').innerHTML= `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML= `${json.temp} <sup>ºC</sup`;
    document.querySelector('.ventoInfo').innerHTML= `${json.windSpeed} <span>Km/h</span>`;
    document.querySelector('#clima').innerHTML = `${json.desc}`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

function aviso(msg){
    document.querySelector('.aviso').innerHTML = msg;
}
function clearInfo(){
    aviso('');
    document.querySelector('.resultado').style.display = 'none';


}