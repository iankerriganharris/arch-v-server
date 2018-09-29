FROM amazonlinux:2017.03

RUN yum -y update
RUN yum -y install curl gnupg2 gcc gcc-c++ make python27-pip cairo-devel libjpeg-turbo-devel giflib-devel pango-devel

RUN curl https://nodejs.org/download/release/v8.10.0/node-v8.10.0-linux-x64.tar.gz | tar xz -C /usr --strip-components=1

RUN pip install awscli --upgrade --user

WORKDIR /var/task




