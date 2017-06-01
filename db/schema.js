var Schema = {
  Users: {
    id:                 {type: 'increments', nullable: false, primary: true},
    first_name:         {type: 'string', nullable: false},
    last_name:          {type: 'string', nullable: false},
    team:               {type: 'integer', nullable: true},
    available:          {type: 'boolean', nullable: true}
  }
};

module.exports = Schema;
