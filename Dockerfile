FROM node:lts as dependencies
WORKDIR /my-project
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /turbo-eth
COPY . .
COPY --from=dependencies /turbo-eth/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /turbo-eth
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /turbo-eth/next.config.js ./
COPY --from=builder /apps/wagmi-app/public ./public
COPY --from=builder /apps/wagmi-app/.next ./.next
COPY --from=builder /apps/wagmi-app/node_modules ./node_modules
COPY --from=builder /apps/wagmi-app/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]