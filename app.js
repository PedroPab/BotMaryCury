const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])


const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        'es con mucho gusto :)',
    ],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido al bot de Domi Burguer')
    .addAnswer(
        [
            '*¡Nos hemos actualizado!*',
            'Ahora puedes hacer tu pedido de una manera más ágil. Ingresando a:  https://domiburguer.com',
            'Si deseas hablar con una de nuestras asistentes envía el número 1',
        ],
        null,
        null,
        // [flowDocs, flowGracias, flowTuto, flowDiscord]
        [flowGracias, flowSecundario]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
