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