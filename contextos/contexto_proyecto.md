Opción 1. Aplicación de front end
🟢 Desarrollarás una aplicación React de tu elección y le conectarás una API third-party. No tendrás un diseño estricto de Figma, pero sí un kit de herramientas con elementos de la interfaz de usuario (botones, formularios y ventanas modales) que puedes utilizar para los estilos. También encontrarás una lista de APIs sugeridas, y no tienes que limitarte a ellas. Puedes elegir cualquier servicio third-party para obtener los datos en función de tu idea.

La aplicación React debe tener al menos dos páginas:

la página donde estará la funcionalidad central de tu aplicación y se mostrarán los datos obtenidos de la API;
la página "Sobre el autor": una sección sencilla donde compartas una breve descripción tuya (opcionalmente, también puedes agregar detalles sobre el proyecto).
La API third-party debe devolver datos JSON que contengan datos que mostrar. Como las solicitudes se enviarán al servicio third-party desde el navegador, no necesitarás escribir el back end.

Dependiendo del contexto, los datos pueden presentarse en forma de tarjetas, tablas, artículos o un mapa con marcadores. No tienes una pauta estricta, pero asegúrate de que se reutilizan bloques idénticos en diferentes partes de la página web. Debes crear componentes reutilizables con React.

Opción 2. Aplicación full stack
🟠 Si quieres desarrollar tus habilidades de desarrollador full stack, tienes más tiempo hasta la graduación, y estás seguro de que puedes abarcar el temario, considera escoger esta opción. Además de la aplicación React, construirás una API personalizada para autorizar y almacenar los datos de los usuarios.

Implementar el front end
Esta opción incluye todo lo de la opción 1 y le suma tres cosas:

un formulario de registro y otro de inicio de sesión, cada uno en una ventana modal o en su propia página;
el encabezado se ve distinto según si la persona inició sesión o no;
una página, disponible solo para quien inició sesión, donde cada persona ve los datos que son suyos.
Implementar el back end
En esta opción, tendrás que trabajar con dos APIs:

una API third-party, que devuelve JSON con datos para mostrar;
una API propia para la autenticación de usuarios y para guardar sus datos. Ese servidor lo construirás tú.
Esos datos son los que pertenecen a cada persona y solo ella ve: puede ser una lista de favoritos, notas propias sobre los elementos, una valoración personal, una lista de seguimiento con estados. Elige lo que tenga sentido para tu idea.

Infraestructura
Tu proyecto se alojará en un repositorio público en GitHub. Para el desarrollo del front end, utilizarás Vite como herramienta de construcción y escribirás tu código en TypeScript.