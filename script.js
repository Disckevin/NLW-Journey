// bibliotecas e códigos de terceiros
const formatador = (data) => {
  return {
    dia: {
      numerico: dayjs(data).format("DD"),
      semana: {
        curto: dayjs(data).format("ddd"),
        longo: dayjs(data).format("dddd"),
      },
    },
    mes: dayjs(data).format("MMMM"),
    hora: dayjs(data).format("HH:mm"),
  }
}

// object {}
const atividade = {
  nome: "Almoço",
  data: new Date("2024-07-08 10:00"),
  finalizada: true,
}

// Lista, array, vetor []
let atividades = [
  atividade,
  {
    nome: "Academia em grupo",
    data: new Date("2024-07-09 08:00"),
    finalizada: false,
  },
  {
    nome: "Gamming session",
    data: new Date("2024-07-09 16:00"),
    finalizada: true,
  },
]

// atividades = []

// arrow function
const criarItemDeAtividade = (atividade) => {
  let input = `
  <input 
  onchange="concluirAtividade(event)"
  value="${atividade.data}"
  type="checkbox" 
  `

  if (atividade.finalizada) {
    input += "checked"
  }

  input += ">"

  const formatar = formatador(atividade.data)

  return `
  <div class="card-bg">
    ${input}
    <div>
      <img class="active" src="./assets/circle-check.svg" alt="ativo">
      <img class="inactive" src="./assets/circle-dashed.svg" alt="desativado">

      <span>${atividade.nome}</span>
    </div>

    <time class="short">
    ${formatar.dia.semana.curto}.
    ${formatar.dia.numerico} <br>
    ${formatar.hora}h
    </time>
    <time class="full">
    ${formatar.dia.semana.longo}, 
    dia ${formatar.dia.numerico} 
    de ${formatar.mes}
    às ${formatar.hora}h
    </time>
  </div>
  `
}

const atualizarListaDeAtualidade = () => {
  const section = document.querySelector("section")
  section.innerHTML = ""

  // verificar se a minha lista está vazia
  if (atividades.length == 0) {
    section.innerHTML = "<p>Nenhuma atividade cadastrada.</p>"
    return
  }

  for (let atividade of atividades) {
    section.innerHTML += criarItemDeAtividade(atividade)
  }
}
atualizarListaDeAtualidade()

const salvarAtividade = (event) => {
  event.preventDefault()
  const dadosDoFormulario = new FormData(event.target)
  const nome = dadosDoFormulario.get("atividade")
  const dia = dadosDoFormulario.get("dia")
  const hora = dadosDoFormulario.get("hora")
  const data = `${dia} ${hora}`

  const novaAtividade = {
    nome,
    data,
    finalizada: false,
  }

  const atividadeExiste = atividades.find((atividade) => {
    return atividade.data == novaAtividade.data
  })

  if (atividadeExiste) {
    return alert("Dia/Hora não disponível")
  }

  atividades = [novaAtividade, ...atividades]
  atualizarListaDeAtualidade()
}

const criarDiasSelecao = () => {
  const dias = [
    "2024-02-28",
    "2024-02-29",
    "2024-03-01",
    "2024-03-02",
    "2024-03-03",
  ]

  let diasSelecao = ""

  for (let dia of dias) {
    const formatar = formatador(dia)
    const diaFormatado = `
    ${formatar.dia.numerico} de 
    ${formatar.mes}
    `
    diasSelecao += `
      <option value="${dia}">${diaFormatado}</option>
    `
  }

  document.querySelector('select[name="dia"]').innerHTML = diasSelecao
}
criarDiasSelecao()

const criarHorasSelecao = () => {
  let horasDisponiveis = ""

  for (let i = 6; i < 23; i++) {
    const hora = String(i).padStart(2, "0")
    horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`
    horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`
  }

  document.querySelector('select[name="hora"]').innerHTML = horasDisponiveis
}
criarHorasSelecao()

const concluirAtividade = (event) => {
  const input = event.target
  const dataDesteInput = input.value

  const atividade = atividades.find((atividade) => {
    return atividade.data == dataDesteInput
  })

  if (!atividade) {
    return
  }

  atividade.finalizada = !atividade.finalizada
}
