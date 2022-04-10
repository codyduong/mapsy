<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]



<!-- PROJECT LOGO -->

<h3 align="center">Mapsy</h3>

  <p align="center">
    Analyzing images from CCTV to determine road status
    <br />
    <br />
    <a href="https://github.com/codyduong/HackKU2022">View Demo</a>
    ·
    <a href="https://github.com/codyduong/HackKU2022/issues">Report Bug</a>
    ·
    <a href="https://github.com/codyduong/HackKU2022/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Mapsy is an interactive web app that analyzes CCTV imagery and weather data to determine realtime road conditions in Lawrence, KS.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [React.js](https://reactjs.org/)
* [Typescript](https://typescriptlang.org/)
* [Google Cloud](https://cloud.google.com/)
* [Node.js](https://nodejs.org/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Make sure you have Node.js installed: [https://nodejs.org/](https://nodejs.org/)

### Installation

1. Create a new firebase project in order to get your API keys: [https://firebase.google.com/](https://firebase.google.com/)
2. Generate a Google Maps API Key: [https://cloud.google.com/](https://cloud.google.com/)
3. Clone the repo in terminal:
   ```sh
   git clone https://github.com/codyduong/HackKU2022.git
   ```
4. In the main folder HACKKU2022, create a .env file and paste your API keys in there. Template below:
   ```sh
   REACT_APP_GOOGLE_MAPS_API_KEY=
   REACT_APP_apiKey=
   REACT_APP_authDomain=
   REACT_APP_projectId=
   REACT_APP_storageBucket=
   REACT_APP_messagingSenderId=
   REACT_APP_appId=
   REACT_APP_measurementId=
   ```
5. In terminal, run Yarn and use it to build the application:
   ```js
   yarn
   yarn build
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Mapsy makes it easier to view the current status of road conditions, especially during periods of inclement weather. By viewing realtime CCTV images at major intersections, users may determine whether or not the road conditions are safe for travel. 

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Integrate Material UI & Stylized Components
- [x] Add Google Maps API Integration
- [x] Add current location zoom to Google Map, fully integrate Searchbar

See the [open issues](https://github.com/codyduong/HackKU2022/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/codyduong/HackKU2022.svg?style=for-the-badge
[contributors-url]: https://github.com/codyduong/HackKU2022/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/codyduong/HackKU2022.svg?style=for-the-badge
[forks-url]: https://github.com/codyduong/HackKU2022/network/members
[stars-shield]: https://img.shields.io/github/stars/codyduong/HackKU2022.svg?style=for-the-badge
[stars-url]: https://github.com/codyduong/HackKU2022/stargazers
[issues-shield]: https://img.shields.io/github/issues/codyduong/HackKU2022.svg?style=for-the-badge
[issues-url]: https://github.com/codyduong/HackKU2022/issues
[license-shield]: https://img.shields.io/github/license/codyduong/HackKU2022.svg?style=for-the-badge
[license-url]: https://github.com/codyduong/HackKU2022/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png