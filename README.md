<!-- PROJECT LOGO -->

<br />
<p align="center">
  <a href="https://github.com/codedesignplus/CodeDesignPlus.Nx/README">
    <img src="https://i.imgur.com/PwbGy0o.png" alt="Logo">
  </a>

  <h3 align="center">CodeDesignPlus.Nx</h3>

  <p align="center">
    "Nx plugin to enhance development in .NET, React, Angular, Next.js, and beyond."
    <br />
    <a href="https://codedesignplus.com">
      <strong>Explore the docs »</strong>
    </a>
    <br />
    <br />
    <a href="https://github.com/codedesignplus/CodeDesignPlus.Nx/issues">
      <img src="https://img.shields.io/github/issues/codedesignplus/CodeDesignPlus.Nx?color=0088ff&style=for-the-badge&logo=github" alt="codedesignplus/CodeDesignPlus.Nx's issues"/>
    </a>
    <a href="https://github.com/codedesignplus/CodeDesignPlus.Nx/pulls">
      <img src="https://img.shields.io/github/issues-pr/codedesignplus/CodeDesignPlus.Nx?color=0088ff&style=for-the-badge&logo=github"  alt="codedesignplus/CodeDesignPlus.Nx's pull requests"/>
    </a>
    <br />    
    <br />
    <img alt="sonarcloud" src="https://sonarcloud.io/images/project_badges/sonarcloud-white.svg" width="100">
    <br />
    <img alt="Quality Gate Status" src="https://sonarcloud.io/api/project_badges/measure?project=CodeDesignPlus.Nx.Key&metric=alert_status" />    
    <img alt="Security Rating" src="https://sonarcloud.io/api/project_badges/measure?project=CodeDesignPlus.Nx.Key&metric=security_rating"/>
    <img alt="Reliability Rating" src="https://sonarcloud.io/api/project_badges/measure?project=CodeDesignPlus.Nx.Key&metric=reliability_rating" />
    <img alt="Vulnerabilities" src="https://sonarcloud.io/api/project_badges/measure?project=CodeDesignPlus.Nx.Key&metric=vulnerabilities" />
    <img alt="Bugs" src="https://sonarcloud.io/api/project_badges/measure?project=CodeDesignPlus.Nx.Key&metric=bugs" />
    <img alt="Code Smells" src="https://sonarcloud.io/api/project_badges/measure?project=CodeDesignPlus.Nx.Key&metric=code_smells" />
    <img alt="Coverage" src="https://sonarcloud.io/api/project_badges/measure?project=CodeDesignPlus.Nx.Key&metric=coverage" />
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [PNPM Commands](#pnpm-commands)
- [Usage](#usage)
  - [Installing the Plugin](#installing-the-plugin)
  - [Using the "library" Generator](#using-the-library-generator)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- About The Project -->

## About The Project

This project is an Nx workspace containing a plugin named "netcore". Currently, this plugin provides a generator called "library" which allows you to easily scaffold out .NET Core libraries. The structure and approach of these libraries are based on the archetype found in [CodeDesignPlus.Net.Library](https://github.com/codedesignplus/CodeDesignPlus.Net.Library).

<!-- Prerequisites -->

## Prerequisites

Before you begin, ensure you have met the following requirements:

Node.js and npm (usually installed with Node.js)
Nx CLI (npm install -g nx)

<!-- Getting Started -->

## Getting Started

To get a local copy up and running, follow these steps:

1. Clone this repository onto your computer.
2. Install the required npm packages:
   ```bash
   pnpm install
   ```
3. Open the project with your preferred editor, like Visual Studio Code.

### PNPM Commands

The project contains several npm scripts to aid development:

- `build`: Build all the projects in the workspace.
- `affected`: Show all projects affected by the changes.
- `affected:submodule`: Run affected checks targeting the submodule.
- `affected:lint`: Lint affected files.
- `affected:test`: Run tests for affected projects.
- `affected:build`: Build affected projects.
- `publish`: Run the publish script.
- `prepare`: Set up Husky for git hooks.
- `format:check`: Check the format of the code.
- `format:write`: Automatically format the code.

You can run any of these commands using:

```bash
pnpm run [command-name]
```
### Realizando Commits

This project utilizes tools like Commitizen, Linter, and Husky to ensure a consistent development experience and high-quality commits.

To leverage these tools, we recommend making commits using the `Git Bash` terminal with the following command:

```bash
git commit -a
```

![Commit from Git Bash](https://imgur.com/vQDcvtk.png)


<!-- Usage -->

## Usage

This project is structured using Nx, an extensible set of tools for monorepos. We provide a specific plugin called "netcore", which contains a generator named "library". This aids in the creation of .NET Core libraries. The generator is based on the archetype found at CodeDesignPlus.Net.Library.

### Installing the Plugin

To install and use the "netcore" plugin in your Nx project, follow these steps:

1. Add the plugin to your workspace:
   ```bash
   pnpm add --save-dev @codedesignplus/netcore
   ```
2. Once the plugin is installed, you can access the "library" generator using the Nx CLI:
   ```
   nx generate codedesignplus:library my-lib-name
   ```

Where my-lib-name is the name of the library you wish to create.

### Using the "library" Generator

The generator creates a new library based on the previously mentioned archetype. You can customize the generation by providing options to the generator:

- `org`: The prefix for the library (defaults to `CodeDesignPlus`).
- `name`: The name of the library.

```bash
nx generate codedesignplus:library --org=MyOrg --name=MyLib
```

This would generate a library named "MyOrg.Net.MyLib" in the `packages/` folder.

<!-- ROADMAP -->

## Roadmap

Refer to [issues](https://github.com/codedesignplus/CodeDesignPlus.Nx/issues) for a list of proposed features and known issues.

<!-- CONTRIBUTING -->

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b features/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See [LICENSE](LICENSE.md) for more information.

<!-- CONTACT -->

## Contact

CodeDesignPlus - [@CodeDesignPlus](https://www.facebook.com/Codedesignplus-115087913695067) - codedesignplus@outlook.com

Project Link: [CodeDesignPlus.Nx](https://github.com/codedesignplus/CodeDesignPlus.Nx)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

We want to thank each and every member of the Latin development community in which we participate, delivering content day by day to continue growing together.

- [Asp.Net Core en Español](https://www.facebook.com/groups/291405831518163/?multi_permalinks=670205453638197)
- [Asp.Net Core](https://www.facebook.com/groups/aspcore/?multi_permalinks=3454898711268798)
- [Asp.net Core -MVC Group](https://www.facebook.com/groups/2400659736836389/?ref=group_browse)
- [Asp.Net MVC (Español)](https://www.facebook.com/groups/180056992071066/?ref=group_browse)
- [.Net Core](https://www.facebook.com/groups/1547819181920312/?ref=group_browse)
- [.NET En Español PROGRAMADORES](https://www.facebook.com/groups/1537580353178689/?ref=group_browse)
- [ASP.Net Core/C#/MVC/API/Jquery/Html/Sql/Angular/Bootstrap.](https://www.facebook.com/groups/302195073639460/?ref=group_browse)
- [.NET en Español](https://www.facebook.com/groups/1191799410855661/?ref=group_browse)
- [Blazor - ASP.NET Core](https://www.facebook.com/groups/324620021830833/?ref=group_browse)
- [C# (.NET)](https://www.facebook.com/groups/354915134536797/?ref=group_browse)
- [ASP.NET MVC(C#)](https://www.facebook.com/groups/663936840427220/?ref=group_browse)
- [Programación C# .Net Peru](https://www.facebook.com/groups/559287427442678/?ref=group_browse)
- [ASP.NET and ASP.NET Core](https://www.facebook.com/groups/160807057346964/?ref=group_browse)
- [ASP.NET AND .NET CORE](https://www.facebook.com/groups/147648562098634/?ref=group_browse)
- [C#, MVC & .NET CORE 3.1](https://www.facebook.com/groups/332314354403273/?ref=group_browse)
- [.NET Core Community](https://www.facebook.com/groups/2128178990740761/?ref=group_browse)
- [Desarrolladores .Net, C#, React](https://www.facebook.com/groups/2907866402565621/?ref=group_browse)
- [Programadores C#](https://www.facebook.com/groups/304179163001281/?ref=group_browse)
- [.NET Core](https://www.facebook.com/groups/136495930173074/?ref=group_browse)
- [ASP.NET EN ESPAÑOL](https://www.facebook.com/groups/507683892666901/?ref=group_browse)
- [Desarrolladores Microsoft.Net](https://www.facebook.com/groups/169250349939705/?ref=group_browse)
- [ASP.NET Core](https://www.facebook.com/groups/141597583026616/?ref=group_browse)
- [Grupo de Desarrolladores .Net de Microsoft](https://www.facebook.com/groups/15270556519/?ref=group_browse)
