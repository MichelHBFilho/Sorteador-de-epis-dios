const elemento = $("[data-info='ep_escolhido_div']");
elemento.hide();
const elementoDescricao = $("[data-info='descricao']");
const elementoImagem = $("[data-info='imagem']");
const elementoTemporada = $("[data-info='temporada']");
const elementoNumeroEpisodio = $("[data-info='episodio']");
const elementoNome = $("[data-info='nome']");
const elementoTitulo = $("[data-info='titulo'");



$("form").submit((e) => {
    e.preventDefault();
    let serie = $(".input_serie").val();
    $.get(`https://www.episodate.com/api/search?q=${serie}`, (data1) => {
        $.get(`https://www.episodate.com/api/show-details?q=${data1.tv_shows[0].permalink}`, (data2) => {
            elemento.hide();

            let serieTotalEpisodios = data2.tvShow.episodes.length;
            console.log(serieTotalEpisodios);
            let episodio = random(0, serieTotalEpisodios - 1);
            episodio = data2.tvShow.episodes[episodio];
            const nomeSerie = data2.tvShow.name;
            const serieDescricao = data2.tvShow.description;
            const serieImagem = data2.tvShow.pictures[random(0, data2.tvShow.pictures.length - 1)];
            const serieTemporada = episodio.season;
            const episodioNumero = episodio.episode;
            const episodioNome = episodio.name;
            
            elementoDescricao.text(serieDescricao.split(".")[0]);
            elementoImagem.attr("src", serieImagem);
            elementoTemporada.text(serieTemporada);
            elementoNumeroEpisodio.text(episodioNumero);
            elementoNome.text(episodioNome);
            elementoTitulo.text(nomeSerie);

            setTimeout(() => {
                elemento.fadeIn();
            }, 300);
            

        })
    })
})

function random(min, max) {
    min = Math.floor(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

