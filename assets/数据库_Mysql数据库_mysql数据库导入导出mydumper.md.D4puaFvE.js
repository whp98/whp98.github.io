import{_ as n,c as a,o as e,ag as p}from"./chunks/framework.DWdSXOaE.js";const u=JSON.parse('{"title":"mysql数据库导入导出mydumper","description":"","frontmatter":{},"headers":[],"relativePath":"数据库/Mysql数据库/mysql数据库导入导出mydumper.md","filePath":"数据库/Mysql数据库/mysql数据库导入导出mydumper.md","lastUpdated":1723028731000}'),i={name:"数据库/Mysql数据库/mysql数据库导入导出mydumper.md"};function l(t,s,o,c,r,d){return e(),a("div",null,[...s[0]||(s[0]=[p(`<h1 id="mysql数据库导入导出mydumper" tabindex="-1">mysql数据库导入导出mydumper <a class="header-anchor" href="#mysql数据库导入导出mydumper" aria-label="Permalink to &quot;mysql数据库导入导出mydumper&quot;">​</a></h1><h2 id="安装工具" tabindex="-1">安装工具 <a class="header-anchor" href="#安装工具" aria-label="Permalink to &quot;安装工具&quot;">​</a></h2><p><a href="https://github.com/mydumper/mydumper" target="_blank" rel="noreferrer">https://github.com/mydumper/mydumper</a></p><h2 id="_1-导出数据库" tabindex="-1">1. 导出数据库 <a class="header-anchor" href="#_1-导出数据库" aria-label="Permalink to &quot;1. 导出数据库&quot;">​</a></h2><p>简单使用</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mydumper</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -P</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3306</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1.1.1.1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -u</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> xxx</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;passwd&#39;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -t</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 8</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -B</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dbName</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./dump</span></span></code></pre></div><p>参数介绍</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mydumper</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --help</span></span></code></pre></div><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用法：</span></span>
<span class="line"><span>  mydumper [选项…] multi-threaded MySQL dumping</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Connection Options</span></span>
<span class="line"><span>  -h, --host                       The host to connect to</span></span>
<span class="line"><span>  -u, --user                       Username with the necessary privileges</span></span>
<span class="line"><span>  -p, --password                   User password</span></span>
<span class="line"><span>  -a, --ask-password               Prompt For User password</span></span>
<span class="line"><span>  -P, --port                       TCP/IP port to connect to</span></span>
<span class="line"><span>  -S, --socket                     UNIX domain socket file to use for connection</span></span>
<span class="line"><span>  --protocol                       The protocol to use for connection (tcp, socket)</span></span>
<span class="line"><span>  -C, --compress-protocol          Use compression on the MySQL connection</span></span>
<span class="line"><span>  --ssl                            Connect using SSL</span></span>
<span class="line"><span>  --ssl-mode                       Desired security state of the connection to the server: DISABLED, PREFERRED, REQUIRED, VERIFY_CA, VERIFY_IDENTITY</span></span>
<span class="line"><span>  --key                            The path name to the key file</span></span>
<span class="line"><span>  --cert                           The path name to the certificate file</span></span>
<span class="line"><span>  --ca                             The path name to the certificate authority file</span></span>
<span class="line"><span>  --capath                         The path name to a directory that contains trusted SSL CA certificates in PEM format</span></span>
<span class="line"><span>  --cipher                         A list of permissible ciphers to use for SSL encryption</span></span>
<span class="line"><span>  --tls-version                    Which protocols the server permits for encrypted connections</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Filter Options</span></span>
<span class="line"><span>  -x, --regex                      Regular expression for &#39;db.table&#39; matching</span></span>
<span class="line"><span>  -B, --database                   Comma delimited list of databases to dump</span></span>
<span class="line"><span>  -i, --ignore-engines             Comma delimited list of storage engines to ignore</span></span>
<span class="line"><span>  --where                          Dump only selected records.</span></span>
<span class="line"><span>  -U, --updated-since              Use Update_time to dump only tables updated in the last U days</span></span>
<span class="line"><span>  --partition-regex                Regex to filter by partition name.</span></span>
<span class="line"><span>  -O, --omit-from-file             File containing a list of database.table entries to skip, one per line (skips before applying regex option)</span></span>
<span class="line"><span>  -T, --tables-list                Comma delimited table list to dump (does not exclude regex option). Table name must include database name. For instance: test.t1,test.t2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Lock Options</span></span>
<span class="line"><span>  -z, --tidb-snapshot              Snapshot to use for TiDB</span></span>
<span class="line"><span>  -k, --no-locks                   Do not execute the temporary shared read lock.  WARNING: This will cause inconsistent backups</span></span>
<span class="line"><span>  --use-savepoints                 Use savepoints to reduce metadata locking issues, needs SUPER privilege</span></span>
<span class="line"><span>  --no-backup-locks                Do not use Percona backup locks</span></span>
<span class="line"><span>  --lock-all-tables                Use LOCK TABLE for all, instead of FTWRL</span></span>
<span class="line"><span>  --less-locking                   Minimize locking time on InnoDB tables.</span></span>
<span class="line"><span>  --trx-consistency-only           Transactional consistency only</span></span>
<span class="line"><span>  --skip-ddl-locks                 Do not send DDL locks when possible</span></span>
<span class="line"><span></span></span>
<span class="line"><span>PMM Options</span></span>
<span class="line"><span>  --pmm-path                       which default value will be /usr/local/percona/pmm2/collectors/textfile-collector/high-resolution</span></span>
<span class="line"><span>  --pmm-resolution                 which default will be high</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Exec Options</span></span>
<span class="line"><span>  --exec-threads                   Amount of threads to use with --exec</span></span>
<span class="line"><span>  --exec                           Command to execute using the file as parameter</span></span>
<span class="line"><span>  --exec-per-thread                Set the command that will receive by STDIN and write in the STDOUT into the output file</span></span>
<span class="line"><span>  --exec-per-thread-extension      Set the extension for the STDOUT file when --exec-per-thread is used</span></span>
<span class="line"><span></span></span>
<span class="line"><span>If long query running found:</span></span>
<span class="line"><span>  --long-query-retries             Retry checking for long queries, default 0 (do not retry)</span></span>
<span class="line"><span>  --long-query-retry-interval      Time to wait before retrying the long query check in seconds, default 60</span></span>
<span class="line"><span>  -l, --long-query-guard           Set long query timer in seconds, default 60</span></span>
<span class="line"><span>  -K, --kill-long-queries          Kill long running queries (instead of aborting)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Job Options</span></span>
<span class="line"><span>  --max-threads-per-table          Maximum number of threads per table to use</span></span>
<span class="line"><span>  --char-deep                      Defines the amount of characters to use when the primary key is a string</span></span>
<span class="line"><span>  --char-chunk                     Defines in how many pieces should split the table. By default we use the amount of threads</span></span>
<span class="line"><span>  -r, --rows                       Spliting tables into chunks of this many rows. It can be MIN:START_AT:MAX. MAX can be 0 which means that there is no limit. It will double the chunk size if query takes less than 1 second and half of the size if it is more than 2 seconds</span></span>
<span class="line"><span>  --split-partitions               Dump partitions into separate files. This options overrides the --rows option for partitioned tables.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Checksum Options</span></span>
<span class="line"><span>  -M, --checksum-all               Dump checksums for all elements</span></span>
<span class="line"><span>  --data-checksums                 Dump table checksums with the data</span></span>
<span class="line"><span>  --schema-checksums               Dump schema table and view creation checksums</span></span>
<span class="line"><span>  --routine-checksums              Dump triggers, functions and routines checksums</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Objects Options</span></span>
<span class="line"><span>  -m, --no-schemas                 Do not dump table schemas with the data and triggers</span></span>
<span class="line"><span>  -Y, --all-tablespaces            Dump all the tablespaces.</span></span>
<span class="line"><span>  -d, --no-data                    Do not dump table data</span></span>
<span class="line"><span>  -G, --triggers                   Dump triggers. By default, it do not dump triggers</span></span>
<span class="line"><span>  -E, --events                     Dump events. By default, it do not dump events</span></span>
<span class="line"><span>  -R, --routines                   Dump stored procedures and functions. By default, it do not dump stored procedures nor functions</span></span>
<span class="line"><span>  --skip-constraints               Remove the constraints from the CREATE TABLE statement. By default, the statement is not modified</span></span>
<span class="line"><span>  --skip-indexes                   Remove the indexes from the CREATE TABLE statement. By default, the statement is not modified</span></span>
<span class="line"><span>  --views-as-tables                Export VIEWs as they were tables</span></span>
<span class="line"><span>  -W, --no-views                   Do not dump VIEWs</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Statement Options</span></span>
<span class="line"><span>  --load-data                      Instead of creating INSERT INTO statements, it creates LOAD DATA statements and .dat files</span></span>
<span class="line"><span>  --csv                            Automatically enables --load-data and set variables to export in CSV format.</span></span>
<span class="line"><span>  --include-header                 When --load-data or --csv is used, it will include the header with the column name</span></span>
<span class="line"><span>  --fields-terminated-by           Defines the character that is written between fields</span></span>
<span class="line"><span>  --fields-enclosed-by             Defines the character to enclose fields. Default: &quot;</span></span>
<span class="line"><span>  --fields-escaped-by              Single character that is going to be used to escape characters in theLOAD DATA stament, default: &#39;\\&#39; </span></span>
<span class="line"><span>  --lines-starting-by              Adds the string at the begining of each row. When --load-data is usedit is added to the LOAD DATA statement. Its affects INSERT INTO statementsalso when it is used.</span></span>
<span class="line"><span>  --lines-terminated-by            Adds the string at the end of each row. When --load-data is used it isadded to the LOAD DATA statement. Its affects INSERT INTO statementsalso when it is used.</span></span>
<span class="line"><span>  --statement-terminated-by        This might never be used, unless you know what are you doing</span></span>
<span class="line"><span>  -N, --insert-ignore              Dump rows with INSERT IGNORE</span></span>
<span class="line"><span>  --replace                        Dump rows with REPLACE</span></span>
<span class="line"><span>  --complete-insert                Use complete INSERT statements that include column names</span></span>
<span class="line"><span>  --hex-blob                       Dump binary columns using hexadecimal notation</span></span>
<span class="line"><span>  --skip-definer                   Removes DEFINER from the CREATE statement. By default, statements are not modified</span></span>
<span class="line"><span>  -s, --statement-size             Attempted size of INSERT statement in bytes, default 1000000</span></span>
<span class="line"><span>  --tz-utc                         SET TIME_ZONE=&#39;+00:00&#39; at top of dump to allow dumping of TIMESTAMP data when a server has data in different time zones or data is being moved between servers with different time zones, defaults to on use --skip-tz-utc to disable.</span></span>
<span class="line"><span>  --skip-tz-utc                    Doesn&#39;t add SET TIMEZONE on the backup files</span></span>
<span class="line"><span>  --set-names                      Sets the names, use it at your own risk, default binary</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Extra Options</span></span>
<span class="line"><span>  -F, --chunk-filesize             Split data files into pieces of this size in MB. Useful for myloader multi-threading.</span></span>
<span class="line"><span>  --exit-if-broken-table-found     Exits if a broken table has been found</span></span>
<span class="line"><span>  --success-on-1146                Not increment error count and Warning instead of Critical in case of table doesn&#39;t exist</span></span>
<span class="line"><span>  -e, --build-empty-files          Build dump files even if no data available from table</span></span>
<span class="line"><span>  --no-check-generated-fields      Queries related to generated fields are not going to be executed.It will lead to restoration issues if you have generated columns</span></span>
<span class="line"><span>  --order-by-primary               Sort the data by Primary Key or Unique key if no primary key exists</span></span>
<span class="line"><span>  --compact                        Give less verbose output. Disables header/footer constructs.</span></span>
<span class="line"><span>  -c, --compress                   Compress output files using: /usr/bin/gzip and /usr/bin/zstd. Options: GZIP and ZSTD. Default: GZIP</span></span>
<span class="line"><span>  --use-defer                      Use defer integer sharding until all non-integer PK tables processed (saves RSS for huge quantities of tables)</span></span>
<span class="line"><span>  --check-row-count                Run SELECT COUNT(*) and fail mydumper if dumped row count is different</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Daemon Options</span></span>
<span class="line"><span>  -D, --daemon                     Enable daemon mode</span></span>
<span class="line"><span>  -I, --snapshot-interval          Interval between each dump snapshot (in minutes), requires --daemon, default 60</span></span>
<span class="line"><span>  -X, --snapshot-count             number of snapshots, default 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>应用程序选项：</span></span>
<span class="line"><span>  -?, --help                       Show help options</span></span>
<span class="line"><span>  -o, --outputdir                  Directory to output files to</span></span>
<span class="line"><span>  --clear                          Clear output directory before dumping</span></span>
<span class="line"><span>  --dirty                          Overwrite output directory without clearing (beware of leftower chunks)</span></span>
<span class="line"><span>  --stream                         It will stream over STDOUT once the files has been written. Since v0.12.7-1, accepts NO_DELETE, NO_STREAM_AND_NO_DELETE and TRADITIONAL which is the default value and used if no parameter is given</span></span>
<span class="line"><span>  -L, --logfile                    Log file name to use, by default stdout is used</span></span>
<span class="line"><span>  --disk-limits                    Set the limit to pause and resume if determines there is no enough disk space.Accepts values like: &#39;&lt;resume&gt;:&lt;pause&gt;&#39; in MB.For instance: 100:500 will pause when there is only 100MB free and willresume if 500MB are available</span></span>
<span class="line"><span>  -t, --threads                    Number of threads to use, 0 means to use number of CPUs. Default: 4</span></span>
<span class="line"><span>  -V, --version                    Show the program version and exit</span></span>
<span class="line"><span>  -v, --verbose                    Verbosity of output, 0 = silent, 1 = errors, 2 = warnings, 3 = info, default 2</span></span>
<span class="line"><span>  --debug                          Turn on debugging output (automatically sets verbosity to 3)</span></span>
<span class="line"><span>  --defaults-file                  Use a specific defaults file. Default: /etc/mydumper.cnf</span></span>
<span class="line"><span>  --defaults-extra-file            Use an additional defaults file. This is loaded after --defaults-file, replacing previous defined values</span></span>
<span class="line"><span>  --fifodir                        Directory where the FIFO files will be created when needed. Default: Same as backup</span></span>
<span class="line"><span></span></span>
<span class="line"><span># host                                  = </span></span>
<span class="line"><span># user                                  = </span></span>
<span class="line"><span># password                              = </span></span>
<span class="line"><span># ask-password                          = FALSE</span></span>
<span class="line"><span>port                                    = 0</span></span>
<span class="line"><span># socket                                = </span></span>
<span class="line"><span># protocol                              = </span></span>
<span class="line"><span># compress-protocol                     = FALSE</span></span>
<span class="line"><span># ssl                                   = FALSE</span></span>
<span class="line"><span># ssl-mode                              = </span></span>
<span class="line"><span># key                                   = </span></span>
<span class="line"><span># cert                                  = </span></span>
<span class="line"><span># ca                                    = </span></span>
<span class="line"><span># capath                                = </span></span>
<span class="line"><span># cipher                                = </span></span>
<span class="line"><span># tls-version                           = </span></span>
<span class="line"><span># regex                                 = &quot;&quot;</span></span>
<span class="line"><span># database                              = </span></span>
<span class="line"><span># ignore-engines                        = </span></span>
<span class="line"><span># where                                 = </span></span>
<span class="line"><span>updated-since                           = 0</span></span>
<span class="line"><span># partition-regex                       = </span></span>
<span class="line"><span># omit-from-file                        = </span></span>
<span class="line"><span># tables-list                           = </span></span>
<span class="line"><span># tidb-snapshot                         = </span></span>
<span class="line"><span># no-locks                              = FALSE</span></span>
<span class="line"><span># use-savepoints                        = FALSE</span></span>
<span class="line"><span># no-backup-locks                       = FALSE</span></span>
<span class="line"><span># lock-all-tables                       = FALSE</span></span>
<span class="line"><span># less-locking                          = FALSE</span></span>
<span class="line"><span># trx-consistency-only                  = FALSE</span></span>
<span class="line"><span># skip-ddl-locks                        = FALSE</span></span>
<span class="line"><span># pmm-path                              = </span></span>
<span class="line"><span># pmm-resolution                        = </span></span>
<span class="line"><span>exec-threads                            = 4</span></span>
<span class="line"><span># exec                                  = </span></span>
<span class="line"><span># exec-per-thread                       = </span></span>
<span class="line"><span># exec-per-thread-extension             = </span></span>
<span class="line"><span>long-query-retries                      = 0</span></span>
<span class="line"><span>long-query-retry-interval               = 60</span></span>
<span class="line"><span>long-query-guard                        = 60</span></span>
<span class="line"><span># kill-long-queries                     = FALSE</span></span>
<span class="line"><span>max-threads-per-table                   = -1</span></span>
<span class="line"><span>rows                                    = 0:0:0</span></span>
<span class="line"><span># split-partitions                      = FALSE</span></span>
<span class="line"><span># checksum-all                          = FALSE</span></span>
<span class="line"><span># data-checksums                        = FALSE</span></span>
<span class="line"><span># schema-checksums                      = FALSE</span></span>
<span class="line"><span># routine-checksums                     = FALSE</span></span>
<span class="line"><span># no-schemas                            = FALSE</span></span>
<span class="line"><span># all-tablespaces                       = FALSE</span></span>
<span class="line"><span># no-data                               = FALSE</span></span>
<span class="line"><span># triggers                              = FALSE</span></span>
<span class="line"><span># events                                = FALSE</span></span>
<span class="line"><span># routines                              = FALSE</span></span>
<span class="line"><span># views-as-tables                       = FALSE</span></span>
<span class="line"><span># no-views                              = FALSE</span></span>
<span class="line"><span># load-data                             = FALSE</span></span>
<span class="line"><span># csv                                   = FALSE</span></span>
<span class="line"><span># include-header                        = FALSE</span></span>
<span class="line"><span># fields-terminated-by                  = </span></span>
<span class="line"><span># fields-enclosed-by                    = </span></span>
<span class="line"><span># fields-escaped-by                     = </span></span>
<span class="line"><span># lines-starting-by                     = </span></span>
<span class="line"><span># lines-terminated-by                   = </span></span>
<span class="line"><span># statement-terminated-by               = </span></span>
<span class="line"><span># insert-ignore                         = FALSE</span></span>
<span class="line"><span># replace                               = FALSE</span></span>
<span class="line"><span># complete-insert                       = FALSE</span></span>
<span class="line"><span># hex-blob                              = FALSE</span></span>
<span class="line"><span># skip-definer                          = FALSE</span></span>
<span class="line"><span>statement-size                          = 1000000</span></span>
<span class="line"><span># tz-utc                                = FALSE</span></span>
<span class="line"><span># skip-tz-utc                           = FALSE</span></span>
<span class="line"><span># set-names                             = </span></span>
<span class="line"><span>chunk-filesize                          = 0</span></span>
<span class="line"><span># exit-if-broken-table-found            = FALSE</span></span>
<span class="line"><span># success-on-1146                       = FALSE</span></span>
<span class="line"><span># build-empty-files                     = FALSE</span></span>
<span class="line"><span># no-check-generated-fields             = FALSE</span></span>
<span class="line"><span># order-by-primary                      = FALSE</span></span>
<span class="line"><span># compact                               = FALSE</span></span>
<span class="line"><span># compress                              = FALSE</span></span>
<span class="line"><span># use-defer                             = FALSE</span></span>
<span class="line"><span># check-row-count                       = FALSE</span></span>
<span class="line"><span># daemon                                = FALSE</span></span>
<span class="line"><span>snapshot-interval                       = 60</span></span>
<span class="line"><span>snapshot-count                          = 2</span></span>
<span class="line"><span>help                                    = TRUE</span></span>
<span class="line"><span>outputdir                               = export-20240807-185624</span></span>
<span class="line"><span># clear                                 = FALSE</span></span>
<span class="line"><span># dirty                                 = FALSE</span></span>
<span class="line"><span># stream                                = FALSE</span></span>
<span class="line"><span># logfile                               = </span></span>
<span class="line"><span># disk-limits                           = </span></span>
<span class="line"><span>threads                                 = 4</span></span>
<span class="line"><span># version                               = FALSE</span></span>
<span class="line"><span>verbose                                 = TRUE</span></span>
<span class="line"><span># debug                                 = FALSE</span></span>
<span class="line"><span>defaults-file                           = /etc/mydumper.cnf</span></span>
<span class="line"><span># defaults-extra-file                   = </span></span>
<span class="line"><span># fifodir                               =</span></span></code></pre></div><h2 id="_2-导入数据库" tabindex="-1">2. 导入数据库 <a class="header-anchor" href="#_2-导入数据库" aria-label="Permalink to &quot;2. 导入数据库&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">myloader</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -u</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> passwd</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -P</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 23306</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -h</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127.0.0.1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -e</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./dump</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -t</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 8</span></span></code></pre></div><p>全部参数</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">myloader</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --help</span></span></code></pre></div><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>myloader --help</span></span>
<span class="line"><span>用法：</span></span>
<span class="line"><span>  myloader [选项…] multi-threaded MySQL loader</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Connection Options</span></span>
<span class="line"><span>  -h, --host                            The host to connect to</span></span>
<span class="line"><span>  -u, --user                            Username with the necessary privileges</span></span>
<span class="line"><span>  -p, --password                        User password</span></span>
<span class="line"><span>  -a, --ask-password                    Prompt For User password</span></span>
<span class="line"><span>  -P, --port                            TCP/IP port to connect to</span></span>
<span class="line"><span>  -S, --socket                          UNIX domain socket file to use for connection</span></span>
<span class="line"><span>  --protocol                            The protocol to use for connection (tcp, socket)</span></span>
<span class="line"><span>  -C, --compress-protocol               Use compression on the MySQL connection</span></span>
<span class="line"><span>  --ssl                                 Connect using SSL</span></span>
<span class="line"><span>  --ssl-mode                            Desired security state of the connection to the server: DISABLED, PREFERRED, REQUIRED, VERIFY_CA, VERIFY_IDENTITY</span></span>
<span class="line"><span>  --key                                 The path name to the key file</span></span>
<span class="line"><span>  --cert                                The path name to the certificate file</span></span>
<span class="line"><span>  --ca                                  The path name to the certificate authority file</span></span>
<span class="line"><span>  --capath                              The path name to a directory that contains trusted SSL CA certificates in PEM format</span></span>
<span class="line"><span>  --cipher                              A list of permissible ciphers to use for SSL encryption</span></span>
<span class="line"><span>  --tls-version                         Which protocols the server permits for encrypted connections</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Filter Options</span></span>
<span class="line"><span>  -x, --regex                           Regular expression for &#39;db.table&#39; matching</span></span>
<span class="line"><span>  -s, --source-db                       Database to restore</span></span>
<span class="line"><span>  --skip-triggers                       Do not import triggers. By default, it imports triggers</span></span>
<span class="line"><span>  --skip-post                           Do not import events, stored procedures and functions. By default, it imports events, stored procedures or functions</span></span>
<span class="line"><span>  --skip-constraints                    Do not import constraints. By default, it imports contraints</span></span>
<span class="line"><span>  --skip-indexes                        Do not import secondary index on InnoDB tables. By default, it import the indexes</span></span>
<span class="line"><span>  --no-data                             Do not dump or import table data</span></span>
<span class="line"><span>  -O, --omit-from-file                  File containing a list of database.table entries to skip, one per line (skips before applying regex option)</span></span>
<span class="line"><span>  -T, --tables-list                     Comma delimited table list to dump (does not exclude regex option). Table name must include database name. For instance: test.t1,test.t2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>PMM Options</span></span>
<span class="line"><span>  --pmm-path                            which default value will be /usr/local/percona/pmm2/collectors/textfile-collector/high-resolution</span></span>
<span class="line"><span>  --pmm-resolution                      which default will be high</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Execution Options</span></span>
<span class="line"><span>  -e, --enable-binlog                   Enable binary logging of the restore data</span></span>
<span class="line"><span>  --innodb-optimize-keys                Creates the table without the indexes and it adds them at the end. Options: AFTER_IMPORT_PER_TABLE and AFTER_IMPORT_ALL_TABLES. Default: AFTER_IMPORT_PER_TABLE</span></span>
<span class="line"><span>  --no-schema                           Do not import table schemas and triggers </span></span>
<span class="line"><span>  --purge-mode                          This specify the truncate mode which can be: FAIL, NONE, DROP, TRUNCATE and DELETE. Default if not set: FAIL</span></span>
<span class="line"><span>  --disable-redo-log                    Disables the REDO_LOG and enables it after, doesn&#39;t check initial status</span></span>
<span class="line"><span>  --checksum                            Treat checksums: skip, fail(default), warn.</span></span>
<span class="line"><span>  -o, --overwrite-tables                Drop tables if they already exist</span></span>
<span class="line"><span>  --overwrite-unsafe                    Same as --overwrite-tables but starts data load as soon as possible. May cause InnoDB deadlocks for foreign keys.</span></span>
<span class="line"><span>  --retry-count                         Lock wait timeout exceeded retry count, default 10 (currently only for DROP TABLE)</span></span>
<span class="line"><span>  --serialized-table-creation           Table recreation will be executed in series, one thread at a time. This means --max-threads-for-schema-creation=1. This option will be removed in future releases</span></span>
<span class="line"><span>  --stream                              It will receive the stream from STDIN and creates the file in the disk before start processing. Since v0.12.7-1, accepts NO_DELETE, NO_STREAM_AND_NO_DELETE and TRADITIONAL which is the default value and used if no parameter is given</span></span>
<span class="line"><span>  --metadata-refresh-interval           Every this amount of tables the internal metadata will be refreshed. If the amount of tables you have in your metadata file is high, then you should increase this value. Default: 100</span></span>
<span class="line"><span>  --ignore-errors                       Not increment error count and Warning instead of Critical in case of any of the comman separated error number list</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Threads Options</span></span>
<span class="line"><span>  --max-threads-per-table               Maximum number of threads per table to use, defaults to --threads</span></span>
<span class="line"><span>  --max-threads-for-index-creation      Maximum number of threads for index creation, default 4</span></span>
<span class="line"><span>  --max-threads-for-post-actions        Maximum number of threads for post action like: constraints, procedure, views and triggers, default 1</span></span>
<span class="line"><span>  --max-threads-for-schema-creation     Maximum number of threads for schema creation. When this is set to 1, is the same than --serialized-table-creation, default 4</span></span>
<span class="line"><span>  --exec-per-thread                     Set the command that will receive by STDIN from the input file and write in the STDOUT</span></span>
<span class="line"><span>  --exec-per-thread-extension           Set the input file extension when --exec-per-thread is used. Otherwise it will be ignored</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Statement Options</span></span>
<span class="line"><span>  -r, --rows                            Split the INSERT statement into this many rows.</span></span>
<span class="line"><span>  -q, --queries-per-transaction         Number of queries per transaction, default 1000</span></span>
<span class="line"><span>  --append-if-not-exist                 Appends IF NOT EXISTS to the create table statements. This will be removed when https://bugs.mysql.com/bug.php?id=103791 has been implemented</span></span>
<span class="line"><span>  --set-names                           Sets the names, use it at your own risk, default binary</span></span>
<span class="line"><span>  --skip-definer                        Removes DEFINER from the CREATE statement. By default, statements are not modified</span></span>
<span class="line"><span></span></span>
<span class="line"><span>应用程序选项：</span></span>
<span class="line"><span>  -?, --help                            Show help options</span></span>
<span class="line"><span>  -d, --directory                       Directory of the dump to import</span></span>
<span class="line"><span>  -L, --logfile                         Log file name to use, by default stdout is used</span></span>
<span class="line"><span>  -B, --database                        An alternative database to restore into</span></span>
<span class="line"><span>  -Q, --quote-character                 Identifier quote character used in INSERT statements. Posible values are: BACKTICK, bt, \` for backtick and DOUBLE_QUOTE, dt, &quot; for double quote. Default: detect from dump if possible, otherwise BACKTICK</span></span>
<span class="line"><span>  --show-warnings                       If enabled, during INSERT IGNORE the warnings will be printed</span></span>
<span class="line"><span>  --resume                              Expect to find resume file in backup dir and will only process those files</span></span>
<span class="line"><span>  -k, --kill-at-once                    When Ctrl+c is pressed it immediately terminates the process</span></span>
<span class="line"><span>  -t, --threads                         Number of threads to use, 0 means to use number of CPUs. Default: 4</span></span>
<span class="line"><span>  -V, --version                         Show the program version and exit</span></span>
<span class="line"><span>  -v, --verbose                         Verbosity of output, 0 = silent, 1 = errors, 2 = warnings, 3 = info, default 2</span></span>
<span class="line"><span>  --debug                               Turn on debugging output (automatically sets verbosity to 3)</span></span>
<span class="line"><span>  --defaults-file                       Use a specific defaults file. Default: /etc/mydumper.cnf</span></span>
<span class="line"><span>  --defaults-extra-file                 Use an additional defaults file. This is loaded after --defaults-file, replacing previous defined values</span></span>
<span class="line"><span>  --fifodir                             Directory where the FIFO files will be created when needed. Default: Same as backup</span></span>
<span class="line"><span></span></span>
<span class="line"><span># host                                  = </span></span>
<span class="line"><span># user                                  = </span></span>
<span class="line"><span># password                              = </span></span>
<span class="line"><span># ask-password                          = FALSE</span></span>
<span class="line"><span>port                                    = 0</span></span>
<span class="line"><span># socket                                = </span></span>
<span class="line"><span># protocol                              = </span></span>
<span class="line"><span># compress-protocol                     = FALSE</span></span>
<span class="line"><span># ssl                                   = FALSE</span></span>
<span class="line"><span># ssl-mode                              = </span></span>
<span class="line"><span># key                                   = </span></span>
<span class="line"><span># cert                                  = </span></span>
<span class="line"><span># ca                                    = </span></span>
<span class="line"><span># capath                                = </span></span>
<span class="line"><span># cipher                                = </span></span>
<span class="line"><span># tls-version                           = </span></span>
<span class="line"><span># regex                                 = &quot;&quot;</span></span>
<span class="line"><span># source-db                             = </span></span>
<span class="line"><span># skip-triggers                         = FALSE</span></span>
<span class="line"><span># skip-constraints                      = FALSE</span></span>
<span class="line"><span># skip-indexes                          = FALSE</span></span>
<span class="line"><span># skip-post                             = FALSE</span></span>
<span class="line"><span># no-data                               = FALSE</span></span>
<span class="line"><span># omit-from-file                        = </span></span>
<span class="line"><span># tables-list                           = </span></span>
<span class="line"><span># pmm-path                              = </span></span>
<span class="line"><span># pmm-resolution                        = </span></span>
<span class="line"><span># enable-binlog                         = FALSE</span></span>
<span class="line"><span># innodb-optimize-keys                  = </span></span>
<span class="line"><span># no-schemas                            = FALSE</span></span>
<span class="line"><span># purge-mode                            = </span></span>
<span class="line"><span># disable-redo-log                      = FALSE</span></span>
<span class="line"><span># checksum                              = </span></span>
<span class="line"><span># overwrite-tables                      = FALSE</span></span>
<span class="line"><span># overwrite-unsafe                      = FALSE</span></span>
<span class="line"><span>retry-count                             = 10</span></span>
<span class="line"><span># serialized-table-creation             = FALSE</span></span>
<span class="line"><span># stream                                = FALSE</span></span>
<span class="line"><span>max-threads-per-table                   = -1</span></span>
<span class="line"><span>max-threads-for-index-creation          = 4</span></span>
<span class="line"><span>max-threads-for-post-actions            = 1</span></span>
<span class="line"><span>max-threads-for-schema-creation         = 4</span></span>
<span class="line"><span># exec-per-thread                       = </span></span>
<span class="line"><span># exec-per-thread-extension             = </span></span>
<span class="line"><span>rows                                    = 0</span></span>
<span class="line"><span>queries-per-transaction                 = 1000</span></span>
<span class="line"><span># append-if-not-exist                   = FALSE</span></span>
<span class="line"><span>set-names                               = binary</span></span>
<span class="line"><span># skip-definer                          = FALSE</span></span>
<span class="line"><span>help                                    = TRUE</span></span>
<span class="line"><span># directory                             = </span></span>
<span class="line"><span># logfile                               = </span></span>
<span class="line"><span># database                              = </span></span>
<span class="line"><span>quote-character                         = \`</span></span>
<span class="line"><span># resume                                = FALSE</span></span>
<span class="line"><span>threads                                 = 4</span></span>
<span class="line"><span># version                               = FALSE</span></span>
<span class="line"><span>verbose                                 = TRUE</span></span>
<span class="line"><span># debug                                 = FALSE</span></span>
<span class="line"><span>defaults-file                           = /etc/mydumper.cnf</span></span>
<span class="line"><span># defaults-extra-file                   = </span></span>
<span class="line"><span># fifodir                               =</span></span></code></pre></div>`,14)])])}const m=n(i,[["render",l]]);export{u as __pageData,m as default};
