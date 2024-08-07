# mysql数据库导入导出mydumper

## 安装工具

https://github.com/mydumper/mydumper
## 1. 导出数据库

简单使用

```shell
mydumper  -P 3306 -h 1.1.1.1  -u xxx -p 'passwd' -t 8 -B dbName -o ./dump
```
参数介绍
```shell
mydumper --help
```
```text
用法：
  mydumper [选项…] multi-threaded MySQL dumping

Connection Options
  -h, --host                       The host to connect to
  -u, --user                       Username with the necessary privileges
  -p, --password                   User password
  -a, --ask-password               Prompt For User password
  -P, --port                       TCP/IP port to connect to
  -S, --socket                     UNIX domain socket file to use for connection
  --protocol                       The protocol to use for connection (tcp, socket)
  -C, --compress-protocol          Use compression on the MySQL connection
  --ssl                            Connect using SSL
  --ssl-mode                       Desired security state of the connection to the server: DISABLED, PREFERRED, REQUIRED, VERIFY_CA, VERIFY_IDENTITY
  --key                            The path name to the key file
  --cert                           The path name to the certificate file
  --ca                             The path name to the certificate authority file
  --capath                         The path name to a directory that contains trusted SSL CA certificates in PEM format
  --cipher                         A list of permissible ciphers to use for SSL encryption
  --tls-version                    Which protocols the server permits for encrypted connections

Filter Options
  -x, --regex                      Regular expression for 'db.table' matching
  -B, --database                   Comma delimited list of databases to dump
  -i, --ignore-engines             Comma delimited list of storage engines to ignore
  --where                          Dump only selected records.
  -U, --updated-since              Use Update_time to dump only tables updated in the last U days
  --partition-regex                Regex to filter by partition name.
  -O, --omit-from-file             File containing a list of database.table entries to skip, one per line (skips before applying regex option)
  -T, --tables-list                Comma delimited table list to dump (does not exclude regex option). Table name must include database name. For instance: test.t1,test.t2

Lock Options
  -z, --tidb-snapshot              Snapshot to use for TiDB
  -k, --no-locks                   Do not execute the temporary shared read lock.  WARNING: This will cause inconsistent backups
  --use-savepoints                 Use savepoints to reduce metadata locking issues, needs SUPER privilege
  --no-backup-locks                Do not use Percona backup locks
  --lock-all-tables                Use LOCK TABLE for all, instead of FTWRL
  --less-locking                   Minimize locking time on InnoDB tables.
  --trx-consistency-only           Transactional consistency only
  --skip-ddl-locks                 Do not send DDL locks when possible

PMM Options
  --pmm-path                       which default value will be /usr/local/percona/pmm2/collectors/textfile-collector/high-resolution
  --pmm-resolution                 which default will be high

Exec Options
  --exec-threads                   Amount of threads to use with --exec
  --exec                           Command to execute using the file as parameter
  --exec-per-thread                Set the command that will receive by STDIN and write in the STDOUT into the output file
  --exec-per-thread-extension      Set the extension for the STDOUT file when --exec-per-thread is used

If long query running found:
  --long-query-retries             Retry checking for long queries, default 0 (do not retry)
  --long-query-retry-interval      Time to wait before retrying the long query check in seconds, default 60
  -l, --long-query-guard           Set long query timer in seconds, default 60
  -K, --kill-long-queries          Kill long running queries (instead of aborting)

Job Options
  --max-threads-per-table          Maximum number of threads per table to use
  --char-deep                      Defines the amount of characters to use when the primary key is a string
  --char-chunk                     Defines in how many pieces should split the table. By default we use the amount of threads
  -r, --rows                       Spliting tables into chunks of this many rows. It can be MIN:START_AT:MAX. MAX can be 0 which means that there is no limit. It will double the chunk size if query takes less than 1 second and half of the size if it is more than 2 seconds
  --split-partitions               Dump partitions into separate files. This options overrides the --rows option for partitioned tables.

Checksum Options
  -M, --checksum-all               Dump checksums for all elements
  --data-checksums                 Dump table checksums with the data
  --schema-checksums               Dump schema table and view creation checksums
  --routine-checksums              Dump triggers, functions and routines checksums

Objects Options
  -m, --no-schemas                 Do not dump table schemas with the data and triggers
  -Y, --all-tablespaces            Dump all the tablespaces.
  -d, --no-data                    Do not dump table data
  -G, --triggers                   Dump triggers. By default, it do not dump triggers
  -E, --events                     Dump events. By default, it do not dump events
  -R, --routines                   Dump stored procedures and functions. By default, it do not dump stored procedures nor functions
  --skip-constraints               Remove the constraints from the CREATE TABLE statement. By default, the statement is not modified
  --skip-indexes                   Remove the indexes from the CREATE TABLE statement. By default, the statement is not modified
  --views-as-tables                Export VIEWs as they were tables
  -W, --no-views                   Do not dump VIEWs

Statement Options
  --load-data                      Instead of creating INSERT INTO statements, it creates LOAD DATA statements and .dat files
  --csv                            Automatically enables --load-data and set variables to export in CSV format.
  --include-header                 When --load-data or --csv is used, it will include the header with the column name
  --fields-terminated-by           Defines the character that is written between fields
  --fields-enclosed-by             Defines the character to enclose fields. Default: "
  --fields-escaped-by              Single character that is going to be used to escape characters in theLOAD DATA stament, default: '\' 
  --lines-starting-by              Adds the string at the begining of each row. When --load-data is usedit is added to the LOAD DATA statement. Its affects INSERT INTO statementsalso when it is used.
  --lines-terminated-by            Adds the string at the end of each row. When --load-data is used it isadded to the LOAD DATA statement. Its affects INSERT INTO statementsalso when it is used.
  --statement-terminated-by        This might never be used, unless you know what are you doing
  -N, --insert-ignore              Dump rows with INSERT IGNORE
  --replace                        Dump rows with REPLACE
  --complete-insert                Use complete INSERT statements that include column names
  --hex-blob                       Dump binary columns using hexadecimal notation
  --skip-definer                   Removes DEFINER from the CREATE statement. By default, statements are not modified
  -s, --statement-size             Attempted size of INSERT statement in bytes, default 1000000
  --tz-utc                         SET TIME_ZONE='+00:00' at top of dump to allow dumping of TIMESTAMP data when a server has data in different time zones or data is being moved between servers with different time zones, defaults to on use --skip-tz-utc to disable.
  --skip-tz-utc                    Doesn't add SET TIMEZONE on the backup files
  --set-names                      Sets the names, use it at your own risk, default binary

Extra Options
  -F, --chunk-filesize             Split data files into pieces of this size in MB. Useful for myloader multi-threading.
  --exit-if-broken-table-found     Exits if a broken table has been found
  --success-on-1146                Not increment error count and Warning instead of Critical in case of table doesn't exist
  -e, --build-empty-files          Build dump files even if no data available from table
  --no-check-generated-fields      Queries related to generated fields are not going to be executed.It will lead to restoration issues if you have generated columns
  --order-by-primary               Sort the data by Primary Key or Unique key if no primary key exists
  --compact                        Give less verbose output. Disables header/footer constructs.
  -c, --compress                   Compress output files using: /usr/bin/gzip and /usr/bin/zstd. Options: GZIP and ZSTD. Default: GZIP
  --use-defer                      Use defer integer sharding until all non-integer PK tables processed (saves RSS for huge quantities of tables)
  --check-row-count                Run SELECT COUNT(*) and fail mydumper if dumped row count is different

Daemon Options
  -D, --daemon                     Enable daemon mode
  -I, --snapshot-interval          Interval between each dump snapshot (in minutes), requires --daemon, default 60
  -X, --snapshot-count             number of snapshots, default 2

应用程序选项：
  -?, --help                       Show help options
  -o, --outputdir                  Directory to output files to
  --clear                          Clear output directory before dumping
  --dirty                          Overwrite output directory without clearing (beware of leftower chunks)
  --stream                         It will stream over STDOUT once the files has been written. Since v0.12.7-1, accepts NO_DELETE, NO_STREAM_AND_NO_DELETE and TRADITIONAL which is the default value and used if no parameter is given
  -L, --logfile                    Log file name to use, by default stdout is used
  --disk-limits                    Set the limit to pause and resume if determines there is no enough disk space.Accepts values like: '<resume>:<pause>' in MB.For instance: 100:500 will pause when there is only 100MB free and willresume if 500MB are available
  -t, --threads                    Number of threads to use, 0 means to use number of CPUs. Default: 4
  -V, --version                    Show the program version and exit
  -v, --verbose                    Verbosity of output, 0 = silent, 1 = errors, 2 = warnings, 3 = info, default 2
  --debug                          Turn on debugging output (automatically sets verbosity to 3)
  --defaults-file                  Use a specific defaults file. Default: /etc/mydumper.cnf
  --defaults-extra-file            Use an additional defaults file. This is loaded after --defaults-file, replacing previous defined values
  --fifodir                        Directory where the FIFO files will be created when needed. Default: Same as backup

# host                                  = 
# user                                  = 
# password                              = 
# ask-password                          = FALSE
port                                    = 0
# socket                                = 
# protocol                              = 
# compress-protocol                     = FALSE
# ssl                                   = FALSE
# ssl-mode                              = 
# key                                   = 
# cert                                  = 
# ca                                    = 
# capath                                = 
# cipher                                = 
# tls-version                           = 
# regex                                 = ""
# database                              = 
# ignore-engines                        = 
# where                                 = 
updated-since                           = 0
# partition-regex                       = 
# omit-from-file                        = 
# tables-list                           = 
# tidb-snapshot                         = 
# no-locks                              = FALSE
# use-savepoints                        = FALSE
# no-backup-locks                       = FALSE
# lock-all-tables                       = FALSE
# less-locking                          = FALSE
# trx-consistency-only                  = FALSE
# skip-ddl-locks                        = FALSE
# pmm-path                              = 
# pmm-resolution                        = 
exec-threads                            = 4
# exec                                  = 
# exec-per-thread                       = 
# exec-per-thread-extension             = 
long-query-retries                      = 0
long-query-retry-interval               = 60
long-query-guard                        = 60
# kill-long-queries                     = FALSE
max-threads-per-table                   = -1
rows                                    = 0:0:0
# split-partitions                      = FALSE
# checksum-all                          = FALSE
# data-checksums                        = FALSE
# schema-checksums                      = FALSE
# routine-checksums                     = FALSE
# no-schemas                            = FALSE
# all-tablespaces                       = FALSE
# no-data                               = FALSE
# triggers                              = FALSE
# events                                = FALSE
# routines                              = FALSE
# views-as-tables                       = FALSE
# no-views                              = FALSE
# load-data                             = FALSE
# csv                                   = FALSE
# include-header                        = FALSE
# fields-terminated-by                  = 
# fields-enclosed-by                    = 
# fields-escaped-by                     = 
# lines-starting-by                     = 
# lines-terminated-by                   = 
# statement-terminated-by               = 
# insert-ignore                         = FALSE
# replace                               = FALSE
# complete-insert                       = FALSE
# hex-blob                              = FALSE
# skip-definer                          = FALSE
statement-size                          = 1000000
# tz-utc                                = FALSE
# skip-tz-utc                           = FALSE
# set-names                             = 
chunk-filesize                          = 0
# exit-if-broken-table-found            = FALSE
# success-on-1146                       = FALSE
# build-empty-files                     = FALSE
# no-check-generated-fields             = FALSE
# order-by-primary                      = FALSE
# compact                               = FALSE
# compress                              = FALSE
# use-defer                             = FALSE
# check-row-count                       = FALSE
# daemon                                = FALSE
snapshot-interval                       = 60
snapshot-count                          = 2
help                                    = TRUE
outputdir                               = export-20240807-185624
# clear                                 = FALSE
# dirty                                 = FALSE
# stream                                = FALSE
# logfile                               = 
# disk-limits                           = 
threads                                 = 4
# version                               = FALSE
verbose                                 = TRUE
# debug                                 = FALSE
defaults-file                           = /etc/mydumper.cnf
# defaults-extra-file                   = 
# fifodir                               = 
```

## 2. 导入数据库

```shell
myloader -u user -p passwd -P 23306 -h 127.0.0.1 -e -d ./dump -t 8
```

全部参数

```shell
myloader --help
```

```text
myloader --help
用法：
  myloader [选项…] multi-threaded MySQL loader

Connection Options
  -h, --host                            The host to connect to
  -u, --user                            Username with the necessary privileges
  -p, --password                        User password
  -a, --ask-password                    Prompt For User password
  -P, --port                            TCP/IP port to connect to
  -S, --socket                          UNIX domain socket file to use for connection
  --protocol                            The protocol to use for connection (tcp, socket)
  -C, --compress-protocol               Use compression on the MySQL connection
  --ssl                                 Connect using SSL
  --ssl-mode                            Desired security state of the connection to the server: DISABLED, PREFERRED, REQUIRED, VERIFY_CA, VERIFY_IDENTITY
  --key                                 The path name to the key file
  --cert                                The path name to the certificate file
  --ca                                  The path name to the certificate authority file
  --capath                              The path name to a directory that contains trusted SSL CA certificates in PEM format
  --cipher                              A list of permissible ciphers to use for SSL encryption
  --tls-version                         Which protocols the server permits for encrypted connections

Filter Options
  -x, --regex                           Regular expression for 'db.table' matching
  -s, --source-db                       Database to restore
  --skip-triggers                       Do not import triggers. By default, it imports triggers
  --skip-post                           Do not import events, stored procedures and functions. By default, it imports events, stored procedures or functions
  --skip-constraints                    Do not import constraints. By default, it imports contraints
  --skip-indexes                        Do not import secondary index on InnoDB tables. By default, it import the indexes
  --no-data                             Do not dump or import table data
  -O, --omit-from-file                  File containing a list of database.table entries to skip, one per line (skips before applying regex option)
  -T, --tables-list                     Comma delimited table list to dump (does not exclude regex option). Table name must include database name. For instance: test.t1,test.t2

PMM Options
  --pmm-path                            which default value will be /usr/local/percona/pmm2/collectors/textfile-collector/high-resolution
  --pmm-resolution                      which default will be high

Execution Options
  -e, --enable-binlog                   Enable binary logging of the restore data
  --innodb-optimize-keys                Creates the table without the indexes and it adds them at the end. Options: AFTER_IMPORT_PER_TABLE and AFTER_IMPORT_ALL_TABLES. Default: AFTER_IMPORT_PER_TABLE
  --no-schema                           Do not import table schemas and triggers 
  --purge-mode                          This specify the truncate mode which can be: FAIL, NONE, DROP, TRUNCATE and DELETE. Default if not set: FAIL
  --disable-redo-log                    Disables the REDO_LOG and enables it after, doesn't check initial status
  --checksum                            Treat checksums: skip, fail(default), warn.
  -o, --overwrite-tables                Drop tables if they already exist
  --overwrite-unsafe                    Same as --overwrite-tables but starts data load as soon as possible. May cause InnoDB deadlocks for foreign keys.
  --retry-count                         Lock wait timeout exceeded retry count, default 10 (currently only for DROP TABLE)
  --serialized-table-creation           Table recreation will be executed in series, one thread at a time. This means --max-threads-for-schema-creation=1. This option will be removed in future releases
  --stream                              It will receive the stream from STDIN and creates the file in the disk before start processing. Since v0.12.7-1, accepts NO_DELETE, NO_STREAM_AND_NO_DELETE and TRADITIONAL which is the default value and used if no parameter is given
  --metadata-refresh-interval           Every this amount of tables the internal metadata will be refreshed. If the amount of tables you have in your metadata file is high, then you should increase this value. Default: 100
  --ignore-errors                       Not increment error count and Warning instead of Critical in case of any of the comman separated error number list

Threads Options
  --max-threads-per-table               Maximum number of threads per table to use, defaults to --threads
  --max-threads-for-index-creation      Maximum number of threads for index creation, default 4
  --max-threads-for-post-actions        Maximum number of threads for post action like: constraints, procedure, views and triggers, default 1
  --max-threads-for-schema-creation     Maximum number of threads for schema creation. When this is set to 1, is the same than --serialized-table-creation, default 4
  --exec-per-thread                     Set the command that will receive by STDIN from the input file and write in the STDOUT
  --exec-per-thread-extension           Set the input file extension when --exec-per-thread is used. Otherwise it will be ignored

Statement Options
  -r, --rows                            Split the INSERT statement into this many rows.
  -q, --queries-per-transaction         Number of queries per transaction, default 1000
  --append-if-not-exist                 Appends IF NOT EXISTS to the create table statements. This will be removed when https://bugs.mysql.com/bug.php?id=103791 has been implemented
  --set-names                           Sets the names, use it at your own risk, default binary
  --skip-definer                        Removes DEFINER from the CREATE statement. By default, statements are not modified

应用程序选项：
  -?, --help                            Show help options
  -d, --directory                       Directory of the dump to import
  -L, --logfile                         Log file name to use, by default stdout is used
  -B, --database                        An alternative database to restore into
  -Q, --quote-character                 Identifier quote character used in INSERT statements. Posible values are: BACKTICK, bt, ` for backtick and DOUBLE_QUOTE, dt, " for double quote. Default: detect from dump if possible, otherwise BACKTICK
  --show-warnings                       If enabled, during INSERT IGNORE the warnings will be printed
  --resume                              Expect to find resume file in backup dir and will only process those files
  -k, --kill-at-once                    When Ctrl+c is pressed it immediately terminates the process
  -t, --threads                         Number of threads to use, 0 means to use number of CPUs. Default: 4
  -V, --version                         Show the program version and exit
  -v, --verbose                         Verbosity of output, 0 = silent, 1 = errors, 2 = warnings, 3 = info, default 2
  --debug                               Turn on debugging output (automatically sets verbosity to 3)
  --defaults-file                       Use a specific defaults file. Default: /etc/mydumper.cnf
  --defaults-extra-file                 Use an additional defaults file. This is loaded after --defaults-file, replacing previous defined values
  --fifodir                             Directory where the FIFO files will be created when needed. Default: Same as backup

# host                                  = 
# user                                  = 
# password                              = 
# ask-password                          = FALSE
port                                    = 0
# socket                                = 
# protocol                              = 
# compress-protocol                     = FALSE
# ssl                                   = FALSE
# ssl-mode                              = 
# key                                   = 
# cert                                  = 
# ca                                    = 
# capath                                = 
# cipher                                = 
# tls-version                           = 
# regex                                 = ""
# source-db                             = 
# skip-triggers                         = FALSE
# skip-constraints                      = FALSE
# skip-indexes                          = FALSE
# skip-post                             = FALSE
# no-data                               = FALSE
# omit-from-file                        = 
# tables-list                           = 
# pmm-path                              = 
# pmm-resolution                        = 
# enable-binlog                         = FALSE
# innodb-optimize-keys                  = 
# no-schemas                            = FALSE
# purge-mode                            = 
# disable-redo-log                      = FALSE
# checksum                              = 
# overwrite-tables                      = FALSE
# overwrite-unsafe                      = FALSE
retry-count                             = 10
# serialized-table-creation             = FALSE
# stream                                = FALSE
max-threads-per-table                   = -1
max-threads-for-index-creation          = 4
max-threads-for-post-actions            = 1
max-threads-for-schema-creation         = 4
# exec-per-thread                       = 
# exec-per-thread-extension             = 
rows                                    = 0
queries-per-transaction                 = 1000
# append-if-not-exist                   = FALSE
set-names                               = binary
# skip-definer                          = FALSE
help                                    = TRUE
# directory                             = 
# logfile                               = 
# database                              = 
quote-character                         = `
# resume                                = FALSE
threads                                 = 4
# version                               = FALSE
verbose                                 = TRUE
# debug                                 = FALSE
defaults-file                           = /etc/mydumper.cnf
# defaults-extra-file                   = 
# fifodir                               = 

```