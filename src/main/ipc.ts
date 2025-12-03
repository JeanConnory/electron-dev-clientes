import { app, ipcMain } from "electron";

ipcMain.handle('fetch-users', () => {
    console.log('Fetch users requested');
    return [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
    ];
});

ipcMain.handle('get-version', () => {
    return app.getVersion();
});