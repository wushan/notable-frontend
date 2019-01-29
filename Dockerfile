FROM mhart/alpine-node:8.9.4

ARG API_URL
ENV NODE_ENV=production
ENV HOST 0.0.0.0
ENV API_URL=$API_URL
RUN mkdir -p /app
COPY . /app
WORKDIR /app
# Expose the app port
EXPOSE 3000
RUN apk --no-cache --virtual build-dependencies add \
  python \
  make \
  g++ \
  && npm install pm2 -g \
  && npm install \
  && apk del build-dependencies \
  && npm run build
CMD ["pm2-runtime", "--json", "--env", "production", "process.yml"]
