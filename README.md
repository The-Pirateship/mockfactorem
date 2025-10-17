# Factorem Frontend 

This is the frontend for the Factorem application, a platform for ordering custom manufactured parts. This application is built with Next.js, React, and TypeScript, and styled with Tailwind CSS.

## Project Overview

The main page of the application is a landing page that introduces Factorem and its services. It allows users to upload their design files, select a manufacturing process, and request a quote. 121111

### Key Features

*   **File Upload:** Users can upload their design files through a drag-and-drop interface or a file browser. The application supports various file types, including `.step`, `.stp`, `.sldprt`, `.x_t`, `.ai`, `.pdf`, and `.zip`.
*   **Service Selection:** Users can choose from a range of manufacturing services, including CNC Machining, Sheet Metal Fabrication, and 3D Printing.
*   **Instant Quoting:** The application provides an "instant quote" feature, which is simulated in the current version.
*   **Trusted Partners:** The application displays a list of trusted partners to build confidence with users.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   [Bun](https://bun.sh/) (or npm/yarn)

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username_/mockfactorem.git
    ```
2.  Install NPM packages
    ```sh
    bun install
    ```

### Running the Application

To run the application in development mode, use the following command:

```sh
bun dev
```

This will start the development server at `http://localhost:3000`.

Login credentials:

Email: test@email.com
Password: password

### Building the Application

To build the application for production, use the following command:

```sh
bun build
```

This will create a production-ready build in the `.next` directory.

## Project Structure

The project follows a standard Next.js project structure.

*   `src/app/`: This directory contains the main application pages.
    *   `layout.tsx`: The main layout of the application.
    *   `page.tsx`: The main page of the application.
*   `src/components/`: This directory contains the reusable React components used throughout the application.
    *   `FileUpload.tsx`: The component for handling file uploads.
    *   `ManufacturingCards.tsx`: The component for displaying the manufacturing service options.
    *   `TrustedPartners.tsx`: The component for displaying the list of trusted partners.
*   `public/`: This directory contains static assets, such as images and fonts.
*   `styles/`: This directory contains global stylesheets.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
