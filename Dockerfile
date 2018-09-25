FROM amazonlinux:2017.03

RUN yum -y update
RUN yum -y install curl gnupg2 gcc gcc-c++ make python27-pip cairo-devel libjpeg-turbo-devel giflib-devel pango-devel

# RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
# RUN yum -y install nodejs
RUN curl https://nodejs.org/download/release/v8.10.0/node-v8.10.0-linux-x64.tar.gz | tar xz -C /usr --strip-components=1

RUN pip install awscli --upgrade --user

WORKDIR /var/task

COPY . .

RUN rm -rf node_modules

RUN npm install

# RUN yum -y install make
# RUN yum install gcc-c++

# RUN yum -y install cairo cairo-devel cairomm-devel libjpeg-turbo-devel pango pango-devel pangomm pangomm-devel giflib-devel



