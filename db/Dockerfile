FROM postgres:14.4-alpine
EXPOSE 5432
CMD ["postgres", "-c", "logging_collector=on", "-c", "log_statement=mod"]