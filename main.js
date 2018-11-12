const { app, BrowserWindow } = require('electron');

//declaramos una variable global que hará referencia a nuestro objeto de la ventana, si no se declara
//la ventana se cerrará de manera automatica cuando el objeto JS se recolecte como como basura
let win;

//función que crea una ventana y lo despliega al ejecutarse la aplicación
function createWindow(){
  //instanciamos nuestro objeto BrowserWindow para crear una ventana
  win = new BrowserWindow();

  //y luego cargamos nuestra vista principal, nuestro index.html
  win.loadFile('index.html');

  //abrimos nuestras herramientas de desarrollador al abrir la ventana
  //win.webContents.openDevTools();

  //se emite cuando la ventana está cerrada
  win.on('closed', () => {
    //Al eliminar la referencia al objeto de la ventana, por lo general, almacenaría las ventanas en una
    //matriz si su aplicación admite ventanas múltiples, este es el momento en el que debe eliminar el
    //elemento correspondiente.
    win = null;
  });
}

//Este método se llamará cuando Electron haya incializado bien y completo, y además esté listo para crear
//ventanas del navegador. Algunas APIs solo se pueden usar después de este evento.
app.on('ready', createWindow);

//salir cuando todas las ventanas estén cerradas
app.on('window-all-closed', () => {
  //En macOS es común que las aplicaciones y su barra de menú permanezcan activas hasta que el usuario se
  //cierre explícitamente con Cmd + Q
  if(process.platform !== 'darwin'){
    app.quit();
  }
});

app.on('activate', () => {
  //En macOS es común volver a crear una ventana en la aplicación cuando se hace clic en el ícono de
  //acoplamiento y no hay otras ventanas abiertas.
  if(win === null){
    createWindow();
  }
});

//en este archivo puede seguir escribiendo código para el proceso principal de su apluicación
//También puede ponerlos en archivos separados y llamarlos desde aquí.
