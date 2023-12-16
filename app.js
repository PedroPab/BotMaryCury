const { createBot, createProvider, createFlow, addKeyword, EVENTS, } = require('@bot-whatsapp/bot')


const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowDefautl = addKeyword('')
    .addAnswer(
        [
            'Esperame un momento',
        ],
        { capture: true, delay: 600 },
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
            '¡Genial! Puedes hacer el pedido tú mismo 🤭',
        ],
    )

    .addAnswer(
        [
            '🎊 *Ingresa a:  https://domiburguer.com*',
        ],
        { delay: 600 }
    )
    .addAnswer(
        [
            'Cuando llenes el formulario 📝 te llegara un mensaje de *confirmacion* al whatsApp',
            'después solo es esperar',
        ],
        { delay: 600 }
    )
    .addAnswer(
        [
            '*Eres muy especial para nosotros* ✨ ',
            'Al llenar nuestro formulario nos ayudas a optimizar nuestro tiempo y servicio. ¡Gracias por ser parte de esta mejora! 💖'
        ],
        { delay: 1000 }
    )

const flowNo = addKeyword(['no', 'No'])
    .addAnswer(
        [
            'Tranqui, siempre estaremos aquí para atenderte por este medio ✨\n',
            '¿Qué deseas ordenar el día de hoy?',
        ],
        { delay: 600 }
    )


const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        'es con mucho gusto :)',
    ],
    null,
    null,
    [flowDefautl]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'Ola', 'holi', 'oli', 'buenos', 'dias', 'quiero realizar un pedido', 'buenas', 'buenas tardes', 'tardes', 'noche', 'buenas noches', 'hacer un pedido', 'tines domicilios', 'como estan', 'Cómo estás', 'Como está', 'Cómo esta'])
    .addAnswer('👋 Hola, bienvenido a Domi Burguer')
    .addAnswer(
        [
            '*¡Nos hemos actualizado!*',
            'Ahora puedes hacer tu pedido de una manera más ágil',
            '¿Quieres saber cómo?\n',
            'Escribe:  *si*  /  *no*   para tu respuesta',
        ],
        { capture: true, delay: 600 },
        (ctx, { fallBack }) => {
            const resMin = ctx.body.toLowerCase()
            console.log("🚀 ~ file: app.js:71 ~ resMin:", resMin)

            if (resMin == 'si' ||
                resMin == 'no'
            ) {
                return
            }
            return fallBack()
        },
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

    adapterProvider.on('message', ctx => {
        console.log(`new messge`, ctx)

    })
}

main()
