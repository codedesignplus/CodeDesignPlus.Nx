<!-- PROJECT LOGO -->

<br />
<p align="center">
  <a href="https://github.com/codedesignplus/CodeDesignPlus.Nx/README">
    <img src="https://i.imgur.com/PwbGy0o.png" alt="Logo">
  </a>

  <h3 align="center">@codedesignplus/netcore</h3>

  <p align="center">
     An Nx plugin tailored for streamlined .NET Core development.
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
- [Usage](#usage)
  - [Install](#install)
  - [Using the "library" Generator](#using-the-library-generator)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- About The Project -->

## About The Project

The project introduces the `@codedesignplus/netcore` plugin for Nx. Crafted to bolster the .NET development process, this plugin offers an array of generators and executors. These tools have been meticulously designed to enhance productivity, drawing inspiration and structure from established archetypes, including:

- **library**: A foundational archetype facilitating library development in .NET. Dive deeper into its capabilities at [CodeDesignPlus.Net.Library](https://github.com/codedesignplus/CodeDesignPlus.Net.Library).
- **rest**: An archetype dedicated to RESTful application development, currently under active development.
- **grpc**: Geared towards the development of efficient gRPC applications, this archetype is in the pipeline.
- **graphql**: Targeting the modern GraphQL architecture, this archetype is also under construction.

Stay tuned for continuous enhancements and additions that aim to redefine the .NET development experience.


<!-- Prerequisites -->

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Nx CLI installed
- .NET SDK

<!-- Usage -->

## Usage


Harnessing the power of the `@codedesignplus/netcore` plugin is straightforward. Once integrated into your Nx workspace, the plugin brings a suite of commands to your fingertips. To get started, invoke the provided generators or executors depending on your project's needs. Whether you're initiating a new .NET library or crafting a modern GraphQL backend, the plugin's intuitive command structure simplifies your development flow. Consult the provided documentation for each archetype to dive deeper into specific command structures and best practices. With `@codedesignplus/netcore`, setting up, developing, and optimizing your .NET projects becomes a seamless experience.

### Install

1. Install Nx CLI (if you haven't already):
   ```bash
   npm install -g @nrwl/cli
   ```
2. Create a new Nx workspace (if needed):
   ```bash
   npx create-nx-workspace@latest myworkspace --pm pnpm
   ```
3. Install the @codedesignplus/netcore plugin:
   ```bash
   nx add @codedesignplus/netcore
   ```

### Using the "library" Generator

The primary functionality of this plugin is the `library` generator, which aids in creating .NET libraries.

1. Generate a new library:
    ```bash
    nx generate @codedesignplus/netcore:library --name=YourLibraryName --org=YourOrgName
    ```
    Replace `YourLibraryName` with the desired name for your library and `YourOrgName` with your organization's name. If you don't provide the `org` parameter, the default `CodeDesignPlus` will be used.

2. Explore your project:
The structure of the generated project will be located in the packages/YourOrgName.Net.YourLibraryName directory. Here, you'll find all files and folders related to your new .NET library.

3. Develop and Expand:
Utilize the generated files and structure to develop your library further. Refer to the specific documentation for @codedesignplus/netcore or the archetype you're using for best practices and helpful insights.

4. Build and Test:
Use the tools and commands provided by Nx and the plugin to build, test, and optimize your library before publishing or integrating it into larger applications.

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

Project Link: [CodeDesignPlus.Nx](https://github.com/codedesignplus/)

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
