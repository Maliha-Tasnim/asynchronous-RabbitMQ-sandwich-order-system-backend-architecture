# This docker file builds and deploys the files in nginx.
# The files are based on two tutorials:
# https://mherman.org/blog/dockerizing-a-react-app/
# https://medium.com/yld-blog/deploy-your-create-react-app-with-docker-and-ngnix-653e94ffb537

# Multi-stage builds are used: https://docs.docker.com/develop/develop-images/multistage-build/

# The version are pinned to exact version for this group work, because it should be guaranteed to work.

FROM node:15.12.0-alpine as build
# # https://mherman.org/blog/dockerizing-a-react-app/
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build


FROM nginx:1.19.8-alpine
# https://medium.com/yld-blog/deploy-your-create-react-app-with-docker-and-ngnix-653e94ffb537

COPY --from=build ./build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
