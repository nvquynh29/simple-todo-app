FROM node:20.9.0-slim

ARG PORT
ENV PORT 5500

RUN mkdir /app
WORKDIR /app

RUN addgroup --gid 1001 app
RUN adduser --disabled-password --uid 1001 --gid 1001 app
RUN chown -R app:app /app
USER app

COPY --chown=app:app package*.json .
RUN npm install

COPY . .
EXPOSE $PORT

CMD ["sh", "-c", "npm run start"]
