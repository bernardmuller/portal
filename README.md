# Portal

This is the repository for the Portal reverse proxy that is registered as the official api layer for my domain ([bernardmuller.dev](https://bernardmuller.dev 'bernardmuller.dev')).

Portal acts as a gateway to my apps/projects. When users send requests to my projects and apps, the requests will be processed by it and passed to the service. Portal has its own authentication layer that is connected to a [Redis](https://redis.io/) database. With this, I can store all my users in once centralised place.

## Getting started

To get started and run the project, please follow the instructions below:

### Prerequisites

1. Install dependencies

```sh
    yarn install
```

2. Configure environment variables for backend by creating a new .env file and copy the contents from "example.env" into it.

3. Run the project

```sh
    yarn dev
```

## Project Background

Initially I wanted to use this project to pick up a new language like Go or Rust. I ended up reverting back to Node and Typescipt in order to keep my code for my domain purely JS based. This created the opportunity for me to really reflect everything I have learned regarding authentication and authorization using JWTs. 

### Project Architecture

![Portal Architecture Diagram](/assets/images/portal_architecture.png "Portal Architecture Diagram")

### Resources

[Portal Excalidraw](https://excalidraw.com/#json=cLjKiG14Ai3KRFpEyLI6_,lXOBQYbemacoJbJAmAxdRg 'Portal Excalidraw')