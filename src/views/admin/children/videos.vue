<template>
  <div id="video">
    <main>
      <div class="table">
        <el-table :data="videosFilter" style="width: 100%">
          <el-table-column sortable prop="_id" label="_id"></el-table-column>
          <el-table-column sortable prop="email" label="作者邮箱"></el-table-column>
          <el-table-column sortable prop="title" label="标题"></el-table-column>
          <el-table-column label="类型">
            <template slot-scope="scope">
              {{ scope.row.type | videoTypeFormat }}
            </template>
          </el-table-column>
          <el-table-column prop="desc" label="描述"></el-table-column>
          <el-table-column label="上传时间">
            <template slot-scope="scope">
              {{ scope.row.uploadAt | fullDateFormat }}
            </template>
          </el-table-column>
          <el-table-column label="封面">
            <template slot-scope="scope">
              <el-image style="width: 100px;height: 75px" fit="cover" :src="scope.row.imgUrl | urlFormat"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="playCount" label="播放数"></el-table-column>
          <el-table-column prop="zanCount" label="点赞数"></el-table-column>
          <el-table-column prop="collectCount" label="收藏数"></el-table-column>
          <el-table-column prop="isCheck" label="是否审核">
            <templatevs slot-scope="scope">
              {{ scope.row.isCheck | isCheckFormat }}
            </templatevs>
          </el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="keyWords" placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
              <el-button @click="editVideo(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" @click="deleteVideo(scope.$index, scope.row._id)">删除</el-button>
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
      <div>
        <el-dialog title="编辑" :visible.sync="dialogFormVisible">
          <el-form :model="newVideo" label-width="80px">
            <el-form-item label="标题">
              <el-input v-model="newVideo.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="newVideo.type" autocomplete="off">
                <el-option v-for="(type, index) in types" :label="type" :value="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="newVideo.desc" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="时间">
              <div class="block">
                <el-date-picker v-model="newVideo.uploadAt" type="datetime" placeholder="选择日期"> </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="播放数">
              <el-input v-model="newVideo.playCount" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="审核">
              <el-radio v-model="newVideo.isCheck" :label="true" size="large">通过</el-radio>
              <el-radio v-model="newVideo.isCheck" :label="false" size="large">未审核</el-radio>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </main>
  </div>
</template>
<script>
import { getAll, deleteVideo, editVideo } from '../../../api/video'
export default {
  name: 'User',
  computed: {
    videosFilter() {
      let result = this.videos.filter(
        data =>
          !this.keyWords || data.email.toLowerCase().includes(this.keyWords.toLowerCase()) || data.title.toLowerCase().includes(this.keyWords.toLowerCase())
      )
      this.count = result.length
      return result.slice((this.page - 1) * this.pageSize, this.pageSize * this.page)
    }
  },
  data() {
    return {
      page: 1,
      count: 0,
      pageSize: 6,
      keyWords: '',
      videos: [],
      dialogFormVisible: false,
      newVideo: {},
      // 视频分类
      types: ['生活', '科技', '游戏', '校园', '教育', '动物', '其他']
    }
  },
  methods: {
    async submit() {
      let uploadAt = this.newVideo.uploadAt
      this.newVideo.uploadAt = uploadAt.getTime ? uploadAt.getTime() : uploadAt
      let result = await editVideo(this.newVideo)
      this.videos = result.data
      this.dialogFormVisible = false
    },
    editVideo(index, video) {
      this.dialogFormVisible = true
      this.newVideo = video
    },
    deleteVideo(index, _id) {
      this.$confirm('是否删除?', { type: 'warning' }).then(async () => {
        let result = await deleteVideo(_id)
        this.videos = result.data
      })
    },
    handleCurrent(index) {
      this.page = index
    },
    async init() {
      let result = await getAll()
      this.videos = result.data
    }
  },
  created() {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
#video {
  main {
    margin: 2rem;
    border-radius: 4px;
    background-color: white;
    padding: 1rem;
  }
}
</style>
