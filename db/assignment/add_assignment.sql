INSERT INTO assignments (student_id, assignment_title, assignment_source, assignment_page, assignment_requirements, assignment_duedate, assignment_completed, assignment_composer)
VALUES($1, $2, $3, $4, $5, $6, false, $7)
RETURNING *