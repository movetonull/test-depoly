FROM php:5.4-fpm as base

ARG GROUP_ID
ARG USER_ID
ARG USER_NAME

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    php-pear \
    php5-dev \
    libcurl3-openssl-dev \
    libpcre3-dev \
    php5-intl

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
RUN docker-php-ext-configure gd --with-gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ --with-png-dir=/usr/include/
RUN docker-php-ext-install gd

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer --version=1.10.17
ENV COMPOSER_MEMORY_LIMIT=-1

## Clone id_rsa
#RUN mkdir -p /home/$USER_NAME/.ssh
#ADD id_rsa /home/$USER_NAME/.ssh/id_rsa
#RUN chmod 0664 /home/$USER_NAME/.ssh/id_rsa
#RUN echo "Host git.accurateweb.ru\n\t HostName git.accurateweb.ru\n\t Port 2022\n" >> /home/$USER_NAME/.ssh/config

#RUN mkdir -p /home/$USER_NAME/.composer
#ADD auth.json /home/$USER_NAME/.composer/auth.json
#RUN chmod 0777 /home/$USER_NAME/.composer/auth.json
#
#RUN mkdir -p /home/$USER_NAME/.composer/cache
#RUN chmod 0777 /home/$USER_NAME/.composer/cache


# Add user for laravel application
RUN groupadd -g $GROUP_ID $USER_NAME
RUN useradd -u $USER_ID -ms /bin/bash -g $USER_NAME $USER_NAME
# Change current user to $USER_NAME
USER $USER_NAME

WORKDIR /var/www

#RUN eval $(ssh-agent -s) && ssh-add /home/$USER_NAME/.ssh/id_rsa

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]





# IMAGE FOR DEVELOP
FROM base as dev

ARG GROUP_ID
ARG USER_ID
ARG USER_NAME

USER root

# Clone id_rsa
RUN mkdir -p /home/$USER_NAME/.ssh
ADD id_rsa /home/$USER_NAME/.ssh/id_rsa
RUN chmod 0664 /home/$USER_NAME/.ssh/id_rsa
RUN echo "Host git.accurateweb.ru\n\t HostName git.accurateweb.ru\n\t Port 2022\n" >> /home/$USER_NAME/.ssh/config

RUN mkdir -p /home/$USER_NAME/.composer
ADD auth.json /home/$USER_NAME/.composer/auth.json
RUN chmod 0777 /home/$USER_NAME/.composer/auth.json

RUN mkdir -p /home/$USER_NAME/.composer/cache
RUN chmod 0777 /home/$USER_NAME/.composer/cache

# Change current user to $USER_NAME
USER $USER_NAME

WORKDIR /var/www

RUN eval $(ssh-agent -s) && ssh-add /home/$USER_NAME/.ssh/id_rsa

EXPOSE 9000
CMD ["php-fpm"]