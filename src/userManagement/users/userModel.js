const { DataTypes } = require('sequelize')
const { pgsql, pgsql_kc } = require('../../db')
const roleMapModel = require('../../admin/roleMapping/roleMappingModel')

const usersModel = pgsql.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    keycloak_user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isafe_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nik: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    no_ktp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_of_birth: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    place_of_birth: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    blood_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emergency_contact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    organizational_unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    organizational_unit_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    divisi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    account_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    paranoid: false,
  }
)

const employee = pgsql_kc.define(
  'ugems_sap_employee_data',
  {
    // Model attributes are defined here
    nik: {
      type: DataTypes.STRING,
      required: true,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      required: true,
    },
    phone_no: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    birth_date: {
      type: DataTypes.DATEONLY,
    },
    gender: {
      type: DataTypes.STRING,
    },
    gender_desc: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    start_date: {
      type: DataTypes.DATEONLY,
    },
    end_date: {
      type: DataTypes.DATEONLY,
    },
    emergency_contact: {
      type: DataTypes.STRING,
    },
    company_code: {
      type: DataTypes.STRING,
    },
    company_name: {
      type: DataTypes.STRING,
    },
    personnel_area: {
      type: DataTypes.STRING,
    },
    personnel_area_text: {
      type: DataTypes.STRING,
    },
    personnel_subarea: {
      type: DataTypes.STRING,
    },
    personnel_subarea_text: {
      type: DataTypes.STRING,
    },
    direktorat: {
      type: DataTypes.STRING,
    },
    divisi: {
      type: DataTypes.STRING,
    },
    department: {
      type: DataTypes.STRING,
    },
    section: {
      type: DataTypes.STRING,
    },
    cost_center: {
      type: DataTypes.STRING,
    },
    position_id: {
      type: DataTypes.STRING,
    },
    position_title: {
      type: DataTypes.STRING,
    },
    organizational_unit: {
      type: DataTypes.STRING,
    },
    organizational_unit_name: {
      type: DataTypes.STRING,
    },
    parent_org_unit: {
      type: DataTypes.STRING,
    },
    parent_org_unit_desc: {
      type: DataTypes.STRING,
    },
    is_chief: {
      type: DataTypes.CHAR,
    },
    direct_superior_nik: {
      type: DataTypes.STRING,
    },
    direct_superior_name: {
      type: DataTypes.STRING,
    },
    direct_superior_position_id: {
      type: DataTypes.STRING,
    },
    direct_superior_position_name: {
      type: DataTypes.STRING,
    },
    dept_head_nik: {
      type: DataTypes.STRING,
    },
    dept_head_name: {
      type: DataTypes.STRING,
    },
    dept_head_position_id: {
      type: DataTypes.STRING,
    },
    dept_head_position_name: {
      type: DataTypes.STRING,
    },
    div_head_nik: {
      type: DataTypes.STRING,
    },
    div_head_name: {
      type: DataTypes.STRING,
    },
    div_head_position_id: {
      type: DataTypes.STRING,
    },
    div_head_position_name: {
      type: DataTypes.STRING,
    },
    director_nik: {
      type: DataTypes.STRING,
    },
    director_name: {
      type: DataTypes.STRING,
    },
    director_position_id: {
      type: DataTypes.STRING,
    },
    director_position_name: {
      type: DataTypes.STRING,
    },
    bus_head_nik: {
      type: DataTypes.STRING,
    },
    bus_head_name: {
      type: DataTypes.STRING,
    },
    bus_head_position_id: {
      type: DataTypes.STRING,
    },
    bus_head_position_name: {
      type: DataTypes.STRING,
    },
    ceo_position_id: {
      type: DataTypes.STRING,
    },
    ceo_nik: {
      type: DataTypes.STRING,
    },
    ceo_name: {
      type: DataTypes.STRING,
    },
    ceo_position_name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: false,
    timestamps: false,
    paranoid: false,
  }
)

roleMapModel.belongsTo(usersModel, { as: 'user', foreignKey: 'user_id', targetKey: 'id' })
usersModel.hasOne(roleMapModel, { as: 'roleMap', foreignKey: 'user_id', targetKey: 'id' })

module.exports = { usersModel, employee }
