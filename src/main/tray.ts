import { Menu, Tray, nativeImage, BrowserWindow } from "electron";
import path from 'node:path';

export function createTray(mainWindow: BrowserWindow) {
    const appIcon = path.join(__dirname, 'resources', 'menuTemplate.png');
    let icon = nativeImage.createFromPath(appIcon);
    const tray = new Tray(icon);

    const menu = Menu.buildFromTemplate([
        { label: 'Dev Clientes', enabled: false },
        { type: 'separator' },
        {
            label: 'Cadastrar cliente', click: () => {
                //enviar mensagem do processo (main) para o processo frontend (renderer)
                mainWindow.webContents.send('new-customer');

                if (mainWindow.isMinimized()) {
                    mainWindow.restore();
                    mainWindow.focus();
                }
            }
        },
        {
            label: 'Abrir Aplicativo', click: () => {
                mainWindow.show();
            }
        },
        { type: 'separator' },
        {
            label: 'Sair', role: "quit", click: () => {
                mainWindow.close();
            }
        },
    ]);

    tray.setToolTip('Dev Clientes');

    tray.setContextMenu(menu);
}
