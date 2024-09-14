# Tiamat

Tiamat is a LLM-based conversational agent for VS Code intended for use by novice programming students. To best serve this population, it implements guards to coach, model, and scaffold computational thinking skills.

## Features
### Chat Panel
Use the "Tiamat: Open Chat" command to open the chat with Tiamat. This is what it should look like:

![Tiamat Chat Panel](/images/chat_panel.png)

## Requirements

- [VS Code](https://code.visualstudio.com/download)
- [Node.js with npm/npx](https://nodejs.org/en/download/package-manager)

## For Developers

### Getting Started

Before you get started, make sure you have Node.js, npm/npx, and VS Code installed.

Once you've cloned the repository to your local machine, navigate to the directory and run `npm install` to set up your environment with all of the required packages.

To properly run the extension, it must be compiled and bundled first. To do this, simply run the command:

```
npm run build
```

You can also run watch mode, which will automatically recompile the extension whenever you change a file. To do this, simply run the command:

```
npm run watch
```

### Running and Debugging the Extension

Once everything is set up, open the project in VS Code. Navigate to the "Run and Debug" tab by clicking the icon or by pressing `Ctrl+Shift+D`. Ensure the "Run Extension" option is selected in the dropdown and click the play button, or press `F5`. A new VS Code window should open up, which will be running the extension.

![Run and Debug Panel](/images/how_to_run.png)

In this new window, try running the Hello World command to make sure the extension is set up correctly. Press `Ctrl+Shift+P` to open the command pallete, and search for the command. A "hello world" message box should appear.

![Running Hello World](/images/hello_world.gif)

## Extension Settings

As of now, this extension does not contribute any settings.

## Known Issues

None yet.

## Release Notes

This project is a Work In Progress.

## Following Extension Guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for developing this extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)