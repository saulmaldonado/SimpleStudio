UPDATE assignments
SET assignment_title = $1,
assignment_source = $2,
assignment_page = $3,
assignment_requirements = $4,
assignment_duedate = $5,
assignment_completed = $6,
assignment_composer = $8
WHERE assignment_id = $7
RETURNING *