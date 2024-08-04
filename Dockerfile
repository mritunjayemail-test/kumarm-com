# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:19.6.0 as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

RUN npm install -g npm@10.2.3
RUN npm install -g @ionic/cli

# Install all the dependencies
RUN npm install
# Generate the build of the application
#RUN npm run build --prod
RUN ionic build --prod --minifyjs --minifycss --optimizejs --aot


#RUN aws s3 rb s3://kumarm.nl --force
#RUN aws s3 sync www s3://kumarm.nl
# RUN aws s3 sync /Users/kumar/angular/ionic-conference-app/android/app/build/outputs/apk/debug s3://cdn.kumarm.com

#RUN aws cloudfront create-invalidation --distribution-id E3ESPDQY1H00JR --paths /*

# Stage 2: Serve app with nginx server

FROM nginx:latest
COPY --from=build /usr/local/app/www /usr/share/nginx/html
EXPOSE 80
