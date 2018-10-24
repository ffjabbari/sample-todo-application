FROM node:8-slim

ENV PROJECT_PATH "/usr/local/src/frontend"

ADD ./ ${PROJECT_PATH}

WORKDIR ${PROJECT_PATH}

RUN apt update && \
    apt install bzip2 && \
    mkdir -p build && \
    mkdir -p node_modules && \
    mkdir -p /home/node/.cache/yarn && \
    chown node:node -R ${PROJECT_PATH} /home/node && \
    yarn && \
    wget -q https://github.com/Yelp/dumb-init/releases/download/v1.2.1/dumb-init_1.2.1_amd64.deb && \
    dpkg -i dumb-init_*.deb

USER node

EXPOSE 4200 9876

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "run-script", "build"]
