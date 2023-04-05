let star = document.querySelector('.area-star');
let modal1 = document.querySelector('.area-modal1');
let buttons = star.querySelectorAll('button');
let inputCadastro1 = document.querySelector('#i-1');
let inputCadastro2 = document.querySelector('#i-2');
let erro1 = document.querySelector('#i-1-erro');
let erro2 = document.querySelector('#i-2-erro');
let instrucoes = document.querySelector('.area-instrucao');
let lista = document.querySelector('.area-lista');
let tabela = document.querySelector('tbody');
let areaGamer = document.querySelector('.area-jogo-total');
let inputLetra = document.querySelector('#player-input');
let areaPalavra = document.querySelector('.palavra');
let areaderrota = document.querySelector(".area-perdedor");
let areavencedor = document.querySelector(".area-vecendor");
let areaPlayer = document.querySelector('.area-player'); 
let buttonsGamer = areaPlayer.querySelectorAll('button');
let spanerro = document.querySelector('.area-player-input span');
let fundo = document.querySelector('body');


let acertos = 0
let vitoria = 0
let derrota = 0
let numeroChances = 7
let numeroErros = 0
let forca = 0
let numeroAleatorio = ''
let letrasInformadas =[]
let verificarLetraOk = false
let palavraGamer = ''
let numerofundo = 1


let listaPalavras =[
    {palavra:'Tomate',dica:'Fruta'},
    {palavra:'Colômbia',dica:'País'},
    {palavra:'Cruzeiro',dica:'Time'},
    {palavra:'Ferrari',dica:'Fabricante de Carros'},
    {palavra:'Agrônomo',dica:'Profissão'},
    {palavra:'Leopardo',dica:'Animal'},
    {palavra:'Desfibrilador',dica:'Objeto'},
    {palavra:'Tigre',dica:'Animal'},
    {palavra:'Pequi',dica:'Fruta'},
    {palavra:'Embaixador',dica:'Profissão'},
    {palavra:'Irlanda',dica:'País'},   
    {palavra:'Chelsea',dica:'time'}, 
    {palavra:'Pedreiro',dica:'Profissão'},
    {palavra:'Noruega',dica:'País'},
]

function exibirModal1(){
    desativarBotao (buttons);
    Abrir (modal1,star);
    inputCadastro1.focus();
}

function fecharModal1 (){
    fechar(modal1,star)
    ativaBotao(buttons);
    erro1.innerHTML = "";
    erro1.classList.remove('erro');
    erro2.innerHTML ='';
    erro2.classList.remove('erro');
    document.querySelector('.area-cadastro span').style.display= 'none'
    inputCadastro1.style.border ='none'
    inputCadastro2.style.border ='none'
}

let xModal1 = document.querySelector('.modal-titulo i');
xModal1.addEventListener('click',fecharModal1)

let xInstrucoes = document.querySelector('.title-instrucao i')
xInstrucoes.addEventListener('click',()=>{
    fechar(instrucoes,star)
    ativaBotao(buttons)
})

let xlista = document.querySelector('.title-lista i');
xlista.addEventListener('click',()=>{
    fechar(lista,star)
    ativaBotao(buttons)
})
inputCadastro1.addEventListener('focus',()=>{
    
    document.querySelector('.area-cadastro span').style.display ='none'
})

let buttonCadastro = document.querySelector('.area-cadastro button');
buttonCadastro.addEventListener('click',(e)=>{
    e.preventDefault();
    let nomePalavra = inputCadastro1.value
    let dica = inputCadastro2.value
    let palavra =  nomePalavra.toLowerCase(); 
    let verificador = palavra.match(/[a-z]/g);
    
    if(palavra.includes(' ')){
        erro1.innerHTML = `Informe uma Palavra sem ESPAÇO EX:Banana `;
        erro1.classList.add('erro');
        limparCampo(inputCadastro1)
        inputCadastro1.style.border = ' solid 1px #F00'
       return;
    }
    if(verificador == null ||verificador.length < palavra.length){
        erro1.innerHTML = `Informe uma Palavra somete com letras de A a Z `;
        erro1.classList.add('erro')
        limparCampo(inputCadastro1)
        inputCadastro1.style.border =' solid 1px #F00'
        return;
    }
    if(palavra.length > 14 || palavra.length < 2 ){
        erro1.innerHTML = `caracteres Mínimo: 2 caracteres Máximo: 14  `;
        erro1.classList.add('erro');
        limparCampo(inputCadastro1)
        inputCadastro1.style.border =' solid 1px #F00'
        return;
    } 
    inputCadastro1.value = inputCadastro1.value
    
    if(inputCadastro2.value == ''){
        erro2.innerHTML ='informe uma Dica';
        erro2.classList.add('erro');
        inputCadastro2.focus();
        inputCadastro2.style.border =' solid 1px #F00'
        return;
    } 
    listaPalavras.push({palavra:nomePalavra,dica:dica})
    erro1.innerHTML = "";
    erro1.classList.remove('erro');
    erro2.innerHTML ='';
    erro2.classList.remove('erro');
    inputCadastro1.value = '';
    inputCadastro2.value = '';
    inputCadastro1.style.border ='none'
    inputCadastro2.style.border ='none'
    document.querySelector('.area-cadastro span').style.display= 'inline-block'
    
})
 
function exibirInstrucoes(){
    Abrir (instrucoes,star)
    desativarBotao (buttons)
}

function exibirLista(){
    Abrir (lista,star);
    desativarBotao (buttons);
    tabela.innerHTML =''
    for(let i = 0; i <listaPalavras.length;i++){
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3= document.createElement('td');
        let input = document.createElement('input');
        input.type = 'checkbox';
        td1.innerHTML = listaPalavras[i].palavra.toUpperCase();
        td2.innerHTML = listaPalavras[i].dica.toUpperCase();
        td3.appendChild(input);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tabela.appendChild(tr);
    }
}

function selecionar(){
    let listaInputs = tabela.querySelectorAll('input');
    let inputTodos = document.querySelector('#input-todos'); 
    for(let i = 0 ; i <listaInputs.length;i++){
        if(inputTodos.checked){
            listaInputs[i].checked = true
        }else
        listaInputs[i].checked =false
    }
}
   
function excluirPalavra(){
    let listaInputs = tabela.querySelectorAll('input');
    for(let i = 0 ; i <listaInputs.length;i++){
        if(listaInputs[i].checked){
           let palavranome = listaInputs[i].closest('tr').children[0].innerHTML;
           console.log(palavranome)
           for (let p in listaPalavras){
            if( listaPalavras[p].palavra.toLocaleUpperCase() == palavranome ){
                listaPalavras.splice([p],1)
            }
           }
            listaInputs[i].closest('tr').remove()
        }
    }
}

function AbrirGamer(){
    star.style.opacity = '0';
    areaGamer.style.opacity = '0';
    setTimeout(()=>{
        star.style.display = 'none';
        areaGamer.style.display = 'flex';
       },500) 
    setTimeout(()=>{
       areaGamer.style.opacity ='1' 
       inputLetra.focus() 
    },1000)
}


function gamer(){
    numeroAleatorio = Math.floor(Math.random()* listaPalavras.length );
    palavraGamer = listaPalavras[numeroAleatorio].palavra; 
    areaPalavra.innerHTML= ''  
    
    for(let i = 0; i < palavraGamer.length;i++){
        let span = document.createElement('span')
        span.innerHTML = '_'
        areaPalavra.appendChild(span)
    }
     setTimeout(()=>{
        document.querySelector('.dica span').innerHTML = listaPalavras[numeroAleatorio].dica.toLocaleUpperCase();
        document.querySelector('.numero-letras span').innerHTML = palavraGamer.length; 
    },800);
}

function inciarJogo(){
    AbrirGamer()
    gamer()
}

function verificarLetra (letra){
    letra = letra.toLowerCase();
    let verificadorLetra = letra.match(/[a-z]/g);
    spanerro.innerHTML = ''

    if(letra.length > 1 || letra.length == 0 || verificadorLetra == null ){
      spanerro.innerHTML = 'Informe apenas 1 letra entre A-Z';
      spanerro.classList.add('erro');
      limparCampo(inputLetra)
      inputLetra.style.border =' solid 2px #F00'
      verificarLetraOk = false
      return  
    }
    if(letrasInformadas.indexOf(letra)>-1){
        spanerro.innerHTML = `A Letra: (${letra.toUpperCase()}) Já foi informada`;
        spanerro.classList.add('erro');
        limparCampo(inputLetra)
        inputLetra.style.border =' solid 2px #F00'
        verificarLetraOk = false
        return  
    }
    limparCampo(inputLetra);
    inputLetra.style.border ='none'
    spanerro.classList.remove('erro');
    verificarLetraOk = true
   
}

function play(letra){
    letrasInformadas.push(letra)
    letra = letra.toUpperCase();
    let letraEcontrada = false
    let palavraSorteada = listaPalavras[numeroAleatorio].palavra.toUpperCase();
    let listaLetras = palavraSorteada.split('')
    let listaTarco = areaPalavra.querySelectorAll('span')
    for(let i = 0; i <listaLetras.length ;i++){
        if(listaLetras[i].normalize("NFD").includes(letra)){
            listaTarco[i].innerHTML = listaLetras[i]
            letraEcontrada = true
            acertos++
        }
    }
    if(!letraEcontrada){
        numeroChances--;
        document.querySelector('.numero-chances span').innerHTML = numeroChances
        numeroErros ++;
        document.querySelector('.numero-erros span').innerHTML = numeroErros
        let areaerros = document.querySelector('.palavra-erros span')
        if(areaerros.innerHTML ==''){
            areaerros.innerHTML += letra
        }else{
            areaerros.innerHTML += `-${letra}`
        }
        forca ++;
        document.querySelector('.jogo-forca-img img').src = 'assets/img/forca'+forca+'.png'
    }
   if(acertos == palavraGamer.length ){
        vitoria++;
        document.querySelector('.vitoria span').innerHTML = vitoria;
        desativarBotao (buttonsGamer);
        inputLetra.disabled = true
        setTimeout(()=>{
            Abrir (areavencedor,areaGamer)
        },500)
        return
   }
    if(numeroErros >= 7){
        document.querySelector('.txt-perdedor h2').innerHTML = palavraGamer;
        derrota++;
        document.querySelector('.derrota span').innerHTML = derrota
        inputLetra.disabled = true
        desativarBotao (buttonsGamer)
        setTimeout(()=>{
            Abrir (areaderrota,areaGamer)
        },500)
        return
    }
}

function gamerPlay (){
    let letra = inputLetra.value;
    inputLetra.focus();
    verificarLetra (letra);
    if(verificarLetraOk){
        play(letra);
    }
}
function resetGamer(){
    inputLetra.style.border ='none'
    spanerro.classList.remove('erro');
    spanerro.innerHTML = ''
    acertos = 0;
    numeroChances = 7;
    document.querySelector('.numero-chances span').innerHTML = numeroChances
    numeroErros = 0 ;
    document.querySelector('.numero-erros span').innerHTML = numeroErros
    forca = 0 ;
    document.querySelector('.jogo-forca-img img').src = 'assets/img/forca.png'
    numeroAleatorio = '';
    letrasInformadas =[];
    verificarLetraOk = false;
    document.querySelector('.palavra-erros span').innerHTML =''
    inputLetra.disabled = false

    if(numerofundo < 5){
        numerofundo++;
    }else{
        numerofundo = 1
    }
    fundo.style.backgroundImage ='url(assets/img/fundo'+numerofundo+'.jpg)'
}

function novaPalavra(){
    resetGamer();
    AbrirGamer();
    gamer();
    ativaBotao(buttonsGamer);
    limparCampo(inputLetra);
}
function jogarNovamenteV() {
    resetGamer();
    setTimeout (()=>{
        fechar(areavencedor,areaGamer)
    },300)
    gamer();
    ativaBotao(buttonsGamer);
    limparCampo(inputLetra);
}
function jogarNovamenteD() {
    resetGamer();
    setTimeout (()=>{
        fechar(areaderrota,areaGamer)
    },300)
    gamer();
    ativaBotao(buttonsGamer);
    limparCampo(inputLetra);
}

let botaoJogar = document.querySelector('#player-button');
botaoJogar.addEventListener('click',gamerPlay);
inputLetra.addEventListener('keypress',(e)=>{
    if(e.keyCode == 13){
        gamerPlay();
        console.log('deu certo')
    }
})

let areanovaPalavra =document.querySelector('.nova-palavra');
areanovaPalavra.addEventListener('click',novaPalavra)



function limparCampo(campo){
    campo.value ='';
    campo.focus();
}
function Abrir (Abrir,fechar){
    fechar.style.opacity = '1';
    Abrir.style.opacity = '0';
    Abrir.style.display = 'flex';
    setTimeout(()=>{
        fechar.style.opacity = '0.5';
        Abrir.style.opacity = '1';
    },500)
}

function fechar(fechar,Abrir){
    fechar.style.opacity = '0';
    Abrir.style.display = 'flex';
    setTimeout(()=>{
        fechar.style.display = 'none';
        Abrir.style.opacity = '1';
    },500)
}

function desativarBotao (botao){
    for(let i in botao ){
        botao[i].disabled = true;
    }
}

function ativaBotao(botao){
    for(let i in botao ){
        botao[i].disabled = false;
    }
}
