import { BrowserWindow, app, globalShortcut } from "electron";

export function createShortcuts(window: BrowserWindow) {
    app.on("browser-window-focus", () => {
        // Ativar os atalhos apenas quando a janela estiver focada
        globalShortcut.register("CommandOrControl+N", () => {
            window.webContents.send('new-customer');
        });
    });

    app.on("browser-window-blur", () => {
        // Desativar os atalhos quando a janela perder o foco
        globalShortcut.unregister("CommandOrControl+N");
    });
}