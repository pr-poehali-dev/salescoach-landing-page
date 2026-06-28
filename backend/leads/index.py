import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    '''
    Business: сохраняет заявки с лендинга и отдаёт список заявок для админки.
    Args: event — dict с httpMethod, body, queryStringParameters; context — объект с request_id.
    Returns: HTTP-ответ с результатом сохранения или списком заявок.
    '''
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    conn.autocommit = True

    if method == 'POST':
        data = json.loads(event.get('body') or '{}')
        name = (data.get('name') or '').strip()
        phone = (data.get('phone') or '').strip()
        company = (data.get('company') or '').strip()
        team_size = (data.get('team_size') or '').strip()

        if not name or not phone:
            conn.close()
            return {
                'statusCode': 400,
                'headers': {**cors, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Имя и телефон обязательны'}),
            }

        name_e = name.replace("'", "''")
        phone_e = phone.replace("'", "''")
        company_e = company.replace("'", "''")
        team_e = team_size.replace("'", "''")

        cur = conn.cursor()
        cur.execute(
            "INSERT INTO leads (name, phone, company, team_size) "
            f"VALUES ('{name_e}', '{phone_e}', '{company_e}', '{team_e}') RETURNING id"
        )
        new_id = cur.fetchone()[0]
        cur.close()
        conn.close()

        return {
            'statusCode': 200,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'success': True, 'id': new_id}),
        }

    cur = conn.cursor()
    cur.execute(
        "SELECT id, name, phone, company, team_size, created_at "
        "FROM leads ORDER BY created_at DESC"
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    leads = [
        {
            'id': r[0],
            'name': r[1],
            'phone': r[2],
            'company': r[3],
            'team_size': r[4],
            'created_at': r[5].isoformat() if r[5] else None,
        }
        for r in rows
    ]

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'isBase64Encoded': False,
        'body': json.dumps({'leads': leads}),
    }
