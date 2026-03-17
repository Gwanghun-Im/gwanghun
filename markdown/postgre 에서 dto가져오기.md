# DTO 만들기

```sql
SELECT *
    lpad('', 4) || '/** ' || PD.DESCRIPTION || ' */' || E'\n' ||
    lpad('', 4) || 'private ' ||
    case
        when format_type(pa.atttypid,null) = 'character varying' then 'String'
        when format_type(pa.atttypid,null) = 'timestamp without time zone' then 'LocalDateTime'
        when format_type(pa.atttypid,null) = 'character' then 'String'
        when format_type(pa.atttypid,null) = 'numeric' and col_att.numeric_scale >  0 then 'Long'
        when format_type(pa.atttypid,null) = 'numeric' then 'Integer'
    end ||
    ' ' ||
    substring(replace(initcap('1' || PA.ATTNAME), '_', ''), 2) || ';' || E'\n'
FROM
    PG_CATALOG.PG_STAT_ALL_TABLES PS,
    PG_CATALOG.PG_DESCRIPTION PD,
    PG_CATALOG.PG_ATTRIBUTE PA,
    INFORMATION_SCHEMA.columns col_att
WHERE 1=1
AND PS.SCHEMANAME = (
    SELECT SCHEMANAME
    FROM PG_CATALOG.PG_STAT_ALL_TABLES
    WHERE RELNAME = lower('{테이븖명}')
)
AND PS.RELNAME = lower('{테이븖명}')
AND PS.RELID = PD.OBJOID
AND PD.OBJSUBID <> 0
AND PD.OBJOID = PA.ATTRELID
AND PD.OBJSUBID = PA.ATTNUM
AND col_att.table_name = PS.RELNAME
AND col_att.column_name = PA.ATTNAME
ORDER BY PS.RELNAME, PD.OBJSUBID;
```

# 메세지 추가

```sql
SELECT *
    lpad('', 4) || '/** ' || PD.DESCRIPTION || ' */' || E'\n' ||
    case
        when col_att.numeric_precision > 0 and col_att.numeric_scale > 0
            then lpad('', 4) ||
                format('@DecimalMax(value=%s, message="%s 최대 값은 %s 입니다.")',
                    repeat('9', col_att.numeric_precision-col_att.numeric_scale) || '.' || repeat('9', col_att.numeric_scale),
                    split_part(pd.DESCRIPTION, '.', 1),
                    repeat('9', col_att.numeric_precision-col_att.numeric_scale) || '.' || repeat('9', col_att.numeric_scale)
                ) || E'\n'
        when col_att.numeric_precision > 0
            then lpad('', 4) ||
                format('@Max(value=%s, message="%s 최대 값은 %s 입니다.")',
                    repeat('9', col_att.numeric_precision),
                    split_part(pd.DESCRIPTION, '.', 1),
                    repeat('9', col_att.numeric_precision)
                ) || E'\n'
        else ''
    end ||
    case
        when col_att.is_nullable = 'NO' then lpad('', 4) || format('@NotBlank(message = "%s을(를) 입력해주세요")' , split_part(pd.DESCRIPTION, '.', 1)) || E'\n'
        else ''
    end ||
    case
        when col_att.character_maximum_length > 0 then lpad('', 4) || format('@Size(max = %s, message - "%s 최대 %s자리")' ,col_att.character_maximum_Length, split_part(pd.DESCRIPTION, '.', 1) col_att.character_maximum_length),
        else ''
    end ||
    lpad('', 4) || 'private ' ||
    case
        when format_type(pa.atttypid,null) = 'character varying' then 'String'
        when format_type(pa.atttypid,null) = 'timestamp without time zone' then 'LocalDateTime'
        when format_type(pa.atttypid,null) = 'character' then 'String'
        when format_type(pa.atttypid,null) = 'numeric' and col_att.numeric_scale >  0 then 'Long'
        when format_type(pa.atttypid,null) = 'numeric' then 'Integer'
    end ||
    ' ' ||
    substring(replace(initcap('1' || PA.ATTNAME), '_', ''), 2) || ';' || E'\n'
FROM
    PG_CATALOG.PG_STAT_ALL_TABLES PS,
    PG_CATALOG.PG_DESCRIPTION PD,
    PG_CATALOG.PG_ATTRIBUTE PA,
    INFORMATION_SCHEMA.columns col_att
WHERE 1=1
AND PS.SCHEMANAME = (
    SELECT SCHEMANAME
    FROM PG_CATALOG.PG_STAT_ALL_TABLES
    WHERE RELNAME = lower('{테이븖명}')
)
AND PS.RELNAME = lower('{테이븖명}')
AND PS.RELID = PD.OBJOID
AND PD.OBJSUBID <> 0
AND PD.OBJOID = PA.ATTRELID
AND PD.OBJSUBID = PA.ATTNUM
AND col_att.table_name = PS.RELNAME
AND col_att.column_name = PA.ATTNAME
ORDER BY PS.RELNAME, PD.OBJSUBID;
```
