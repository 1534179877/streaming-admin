<template>
  <div id="live">
    <main>
      <div>
        <el-dialog title="编辑" :visible.sync="dialogFormVisible">
          <el-form :model="newLive" label-width="80px">
            <el-form-item label="直播间名称">
              <el-input v-model="newLive.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="直播状态">
              <el-select v-model="newLive.onLive">
                <el-option label="在播" :value="true"></el-option>
                <el-option label="未播" :value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="table">
        <el-table :data="livesFilter" style="width: 100%">
          <el-table-column sortable prop="_id" label="_id"></el-table-column>
          <el-table-column sortable prop="title" label="直播间名称"></el-table-column>
          <el-table-column prop="email" label="用户邮箱"></el-table-column>
          <el-table-column prop="publishUrl" label="推流地址"></el-table-column>
          <el-table-column prop="playUrl" label="拉流地址"></el-table-column>
          <el-table-column label="直播间封面">
            <template slot-scope="scope">
              <el-image :src="scope.row.imgUrl|urlFormat" style="width: 100px;height: 75px"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="直播状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.onLive ? 'success' : 'primary'"
                disable-transitions>{{scope.row.onLive|onLiveFormat}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="keyWords"
                size="mini"
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button @click="editLive( scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" @click="deleteLive(scope.$index, scope.row._id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--        分页-->
        <el-pagination
          style="text-align: center;margin: 8px 0"
          background
          :current-page="page"
          layout="prev, pager, next,total"
          :total="count"
          :page-size="pageSize"
          @current-change="handleCurrent"
          hide-on-single-page
        ></el-pagination>
      </div>
    </main>
  </div>
</template>
<script>
  import {getAll, editLive, deleteLive} from '../../../api/live'
  export default {
    name: 'Live',
    computed: {
      livesFilter () {
        let result = this.lives.filter(data => !this.keyWords || data.email.toLowerCase().includes(this.keyWords.toLowerCase()) ||
          data.title.toLowerCase().includes(this.keyWords.toLowerCase()))
        this.count = result.length
        return result.slice((this.page - 1) * this.pageSize, this.pageSize * this.page)
      }
    },
    data () {
      return {
        keyWords: '',
        lives: [],
        newLive: {
          _id: '',
          title: '',
          onLive: ''
        },
        dialogFormVisible: false,
        page: 1,
        count: 0,
        pageSize: 6
      }
    },
    methods: {
      async submit () {
        let result = await editLive(this.newLive)
        this.lives = result.data
        this.dialogFormVisible = false
      },
      editLive (index, live) {
        this.newLive._id = live._id
        this.newLive.title = live.title
        this.newLive.onLive = live.onLive
        this.dialogFormVisible = true
      },
      deleteLive (index, _id) {
        this.$confirm('是否删除?', {type: 'warning'}).then(async () => {
          let result = await deleteLive(_id)
          this.lives = result.data
        })
      },
      handleCurrent (index) {
        this.page = index
      },
      async init () {
        let result = await getAll()
        this.lives = result.data
      }
    },
    created () {
      this.init()
    }
  }
</script>
<style lang="scss" scoped>
  #live {
    main {
      margin: 2rem;
      border-radius: 4px;
      background-color: white;
      padding: 1rem;
    }
  }
</style>
