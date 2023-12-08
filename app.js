const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowDefautl = addKeyword('')
    .addAnswer(
        [
            'Esperame un momento',
        ],
        { capture: true },
        (ctx) => {
            console.log(`ctx`, ctx);
        }
    )

const flowDudas = addKeyword('')
    .addAnswer(
        [

        ],
        { capture: true },
        (ctx) => {
            console.log(`ctx`, ctx);
        }
    )


const flowSi = addKeyword(['si', 'Si', 'bueno', 'sí'])
    .addAnswer(
        [
            '¡Genial! Hacer tu pedido con Domi Burguer es fácil y rápido:',
            ' Ingresa a:  *https://domiburguer.com*',
            'Cuando llenes el formulario te llegara un mensaje de *confirmacion* al whatsApp',
            'despues solo es esperar'
        ],
        { capture: true },
        (ctx) => {
            console.log(`ctx`, ctx);
        },
    )

const flowNo = addKeyword(['no', 'No'])
    .addAnswer(
        [
            'Tranqui, siempre estaremos aqui para atenderte por este medio ✨\n',
            '¿Que deseas ordenar el día de hoy?',
        ],
        { capture: true },
        (ctx) => {
            console.log(`ctx`, ctx);
        },
        [flowDefautl]
    )


const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        'es con mucho gusto :)',
    ],
    null,
    null,
    [flowDefautl]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('👋 Hola, bienvenido a Domi Burguer')
    .addAnswer(
        [
            '*¡Nos hemos actualizado!*',
            'Ahora puedes hacer tu pedido de una manera más ágil',
            '¿Quieres saber cómo?\n',
            'Escribe:  *si*  /  *no*   para tu respuesta',
        ],
        null,
        null,
        // [flowDocs, flowGracias, flowTuto, flowDiscord]
        [flowGracias, flowSi, flowNo]
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
