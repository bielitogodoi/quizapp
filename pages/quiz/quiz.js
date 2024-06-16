import { verificarTema, trocarTema } from "../../helpers/tema-helpers.js"

const botaoTema = document.querySelector(".tema button")
const body = document.querySelector("body") 
const assunto = localStorage.getItem("assunto")  

let quiz = {}
let pontos = 0 
let pergunta = 1 
let resposta = ""
let idInputResposta = ""
let respostaCorretaId = ""

botaoTema.addEventListener("click", () => { 
    trocarTema(body, botaoTema)
}) 

verificarTema(body, botaoTema)


function alterarAssunto() {
    const divIcone = document.querySelector(".assunto_icone")
    const iconeImg = document.querySelector(".assunto_icone img") 
    const assuntoTitulo = document.querySelector(".assunto h1")
    
    divIcone.classList.add(assunto.toLowerCase())
    iconeImg.setAttribute("src", '../../assets/images/icon-${assunto.toLowerCase()}.svg')
    iconeImg.setAttribute("alt", 'icone de ${assunto}') 
    assuntoTitulo.innerText = assunto 
}

 async function buscarPerguntas() {
    const urlDados = "../../data.jason"

    await fetch(urlDados).then(resposta => resposta.json()).then(dados => {
        dados.quizzes.forEach(dado => {
            if(dado.title === assunto) {
                quiz = dado
            }
        })
    })
}

function montarPergunta() {
    const main = document.querySelector("main")

    main.innerHTML = '
    
        <section class="pergunta">
            <div>
            
                <p>Questão ${pergunta} de 10</p>

                <h2>${alterarSinais(quiz.questions[pergunta-1].questions)}</h2> 
            </div>
            <div class="barra_progresso">
                <div style="width: ${pergunta * 10}%"></div>

            </div>
        </section>

        <section class="alternativas">
            <form action="">
                <label for="alternativas_a">
                    <input type="radio" id="alternativas_a" name="alternativa" value="${alterarSinais(quiz.questions[pergunta-1].options[0])}">

                    <div>
                        <span>A</span>
                        ${alterarSinais(quiz.questions[pergunta-1].options[0])}
                    </div>
                </label>

                <label for="alternativas_b">
                    <input type="radio" id="alternativas_b" name="alternativa" value="${alterarSinais(quiz.questions[pergunta-1].options[1])}">

                    <div>
                        <span>B</span>
                        ${alterarSinais(quiz.questions[pergunta-1].options[1])}
                    </div>
                </label>

                <label for="alternativas_c">
                    <input type="radio" id="alternativas_c" name="alternativa" value="${alterarSinais(quiz.questions[pergunta-1].options[2])}">

                    <div>
                        <span>C</span>
                        ${alterarSinais(quiz.questions[pergunta-1].options[2])}
                    </div>
                </label>

                <label for="alternativas_d">
                    <input type="radio" id="alternativas_d" name="alternativa" value="${alterarSinais(quiz.questions[pergunta-1].options[2])}">
                    <div>
                        <span>D</span>
                        ${alterarSinais(quiz.questions[pergunta-1].options[3])}  
                    </div>
                </label>
            </form>

            <button>Enviar</button>
        </section>
    '
}

function alterarSinais{texto} {
    return texto.replace(/</g, "&lt").replace(/>/g, "&gt") 
}

function guardarResposta(evento) {
    resposta = evento.target.value
    idInputResposta = evento.targe.id

    const botaoEnviar = documento.querySelector(".alternativas button")
    botaoEnviar.addEventListener("click", validarResposta)
}

function validarResposta() {
   if (resposta === quiz.questions[pergunta-1].answer) {
       document.querySelector('label[for= '${idInputResposta}']').setAttribute("id", "correta")
       pontos = pontos + 1
    } else {
        document.querySelector('label[for='${idInputResposta}']').setAttribute("id", "errada")
        document.querySelector('label[for='${respostaCorretaId}']').setAttribute("id", "correta")
   }

}

async function iniciar() {
    alterarAssunto()
    await buscarPerguntas()
    montarPergunta()

    const inputsResposta  = document.querySelectorAll(".alternativas input")
    inputsResposta.forEach(input => {
        input.addEventListener("click", guardarResposta)

        if (input.value === quiz.questions[perguntas-1].answer) {
            respostaCorretaId = input.id 
        }
    })
}

iniciar()