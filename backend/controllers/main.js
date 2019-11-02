const getTableData = (req, res, db) => {
  db.select('*').from('testtable1')
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const postTableData = (req, res, db) => {
  const { first, last, email, phone, location, hobby } = req.body
  const added = new Date()
  db('testtable1').insert({first, last, email, phone, location, hobby, added})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const putTableData = (req, res, db) => {
  const { id, first, last, email, phone, location, hobby } = req.body
  db('testtable1').where({id}).update({first, last, email, phone, location, hobby})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteTableData = (req, res, db) => {
  const { id } = req.body
  db('testtable1').where({id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const postQuestion = (req, res, db) => {
  
  db('askbot_thread').insert({
    title: 'Testb test test from node',
    tagnames: 'solar system',
    view_count: 1,
    favourite_count: 1,
    answer_count: 1,
    last_activity_at: '2019-11-02 21:29:30.925752+07',
    language_code: 'en',
    closed: false,
    closed_at: null,
    close_reason: null,
    deleted: false,
    approved: true,
    added_at: '2019-11-02 21:29:30.93561+07',
    score: 0,
    accepted_answer_id: null,
    closed_by_id: null,
    last_activity_by_id: 1,
    text_search_vector: "'tersttt':6B 'test':2A,3A,5B,8A,9A,11A,12A 'testb':1A,7A,10A 'testttt':4B",
    title_search_vector: "'test':2A,3A 'testb':1A"
  })
  .returning('id')
  .then(item => {
    console.log(JSON.parse(item))
    res.json(item)
  })
  .catch(err => res.status(400).json({dbError: 'db error'}))

}

const insertToPost = (db, id) => {

  db('askbot_post').insert({
    post_type: 'question',
    old_question_id: null,
    old_answer_id: null,
    old_comment_id: null,
    added_at: '2019-11-02 19:56:29.409424+07',
    endorsed: false,
    endorsed_at: null,
    approved: true,
    deleted: false,
    deleted_at: null,
    wiki: false,
    wikified_at: null,
    locked: false,
    locked_at: null,
    score: 0,
    vote_up_count: 0,
    vote_down_count: 0,
    comment_count: 0,
    offensive_flag_count: 0,
    last_edited_at: ,
    html,
    text,
    language_code,
    summary,
    is_anonymous,
    author_id,
    current_revision_id,
    deleted_by_id,
    endorsed_by_id,
    last_edited_by_id,
    locked_by_id,
    parent_id,
    thread_id: id,
    text_search_vecto
  })
  .returning('*')
  .then(item => {
    //res.json(item)
  })
  .catch(err => res.status(400).json({dbError: 'db error'}))

}

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData,
  postQuestion
}