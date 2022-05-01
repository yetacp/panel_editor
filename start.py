#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from bottle import route, run, template, static_file


@route('/api/<name>')
def index(name):
    return static_file('screen01.json', root='./screens')
#   return template('<b>Hello {{name}}</b>!', name=name)


@route('/')
def send_root():
    return static_file('index.html', root='./ui')


@route('/<filename:path>')
def send_static(filename):
    return static_file(filename, root='./ui')


run(host='localhost', port=3000)
