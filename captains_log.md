# Getting Started

## Cypress setup

* On MacOS, in VSCode, new folder.
    * Node locally installed, v16.6.1
    * Docker Desktop locally installed, kubernetes enabled, 20.10.8, build 3967b7d
* `git init`
* `npm init`
* `npm install cypress`
  * Cypress permissions incorrect?
* Running cypress via Docker
  * Install xquartz https://sourabhbajaj.com/blog/2017/02/07/gui-applications-docker-mac/
    * brew install xquartz # Install
    * open -a XQuartz # Start
    * /usr/X11/bin/xhost +  # configure
  * docker run -it -e DISPLAY=host.docker.internal:0 -v /tmp/.X11-unix:/tmp/.X11-unix -v $PWD:/e2e -w /e2e --entrypoint=cypress cypress/included:3.2.0 open --project .
  * Create cypress/integration/functional.spec.ts
    * Create cypress/tsconfig.json
      * npm i -D cypress typescript
  * create docker-compose

## Next.JS First Route

* npx create-next-app --typescript yarba
* Edit <Title> in yarba/pages/index.tsx
* docker run -it -v $PWD/yarba:/yarba -w /yarba -p 3000:3000 node:current-alpine npm run dev
* Create docker-compose entry
* docker-compose up recipes
* docker-compose run cypress
* Rename docker-compose services
* Add docker compose test services
* Set docker-compose profiles

## Functional Requirements

* Listed out functional requirements, and created functional spec stubs.

## Section Summary:

Put together the initial project functional requirements, tests, and execution outline.
The project is coordinated using Docker Alpine images.
These off-the-shelf images for each language type handle pre-built issues, and let us run code directly from the host development system.
Cypress was tricky to set up, because it requires a display server. 
On OSX, this comes from the xquartz server.
On linux, this should be as straightforward as using DISPLAY=172.17.0.1:0.
On windows, the tool [xming](https://sourceforge.net/projects/xming/) might be the best bet?

# Unit Tests and Recipe List

## Jest configure jest

* https://nextjs.org/docs/testing#manual-setup-1
* npm install --save-dev jest babel-jest @testing-library/react @testing-library/jest-dom identity-obj-proxy react-test-renderer
* Edit files (mostly) as suggested
* cd yarba
* npm run test:watch
* 