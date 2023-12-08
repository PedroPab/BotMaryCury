const { createBot, createProvider, createFlow, addKeyword, EVENTS, } = require('@bot-whatsapp/bot')


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
            '¡Genial! Puedes hacer el pedido tú mismo 🤭\n',
            '🎊 *Ingresa a:  https://domiburguer.com*\n',
            'Cuando llenes el formulario te llegara un mensaje de *confirmacion* al whatsApp',
            'despues solo es esperar'
        ],
    )

const flowNo = addKeyword(['no', 'No'])
    .addAnswer(
        [
            'Tranqui, siempre estaremos aqui para atenderte por este medio ✨\n',
            '¿Que deseas ordenar el día de hoy?',
        ]
    )


const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        'es con mucho gusto :)',
    ],
    null,
    null,
    [flowDefautl]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'buenos', 'dias', 'quiero realizar un pedido', 'buenas', 'buenas tardes', 'tardes', 'noche', 'buenas noches', 'hacer un pedido'])
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
        [flowSi, flowNo]
    )


const flowBienvenida = addKeyword(EVENTS.WELCOME)
    .addAnswer('👋 Hola, bienvenido a Domi Burguer')
    .addAnswer(
        [
            '*¡Nos hemos actualizado!* ✨',
            'Ahora puedes hacer tu pedido de una manera más ágil',
            '¿Quieres saber cómo?\n',
            'Escribe:  *si*  /  *no*   para tu respuesta',
        ],
        null,
        null,
        // [flowDocs, flowGracias, flowTuto, flowDiscord]
        [flowSi, flowNo]
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
