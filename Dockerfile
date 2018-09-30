FROM amazonlinux:2017.03

RUN yum -y update
RUN yum -y install curl python27-pip gcc-c++

RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
RUN yum install -y nodejs zip

RUN pip install awscli --upgrade --user
